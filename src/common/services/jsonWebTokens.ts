import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import cacheKeyEnum from '../enum/redis.base.enum';
import redisService from './redis.services';
import userRepo from '../../DataBase/repos/user.repo';
import { TokenTypeEnum } from '../enum/token.enum';

@Injectable()
class jwtServices {
  private readonly JWTService: JwtService;
  private readonly redisServices: redisService;
  private readonly userRepo: userRepo;
  constructor() {}

  async generateToken({
    payload,
    options,
  }: {
    payload: object;
    options: JwtSignOptions;
  }): Promise<string> {
    return await this.JWTService.signAsync(payload, options);
  }

  verifyToken({
    token,
    options,
  }: {
    token: string;
    options: JwtVerifyOptions;
  }) {
    return this.JWTService.verify(token, options);
  }

  async authenticateUtilts(authorization: string, tokenType: string) {
    let [prefix, token]: Array<string> = authorization.split(' ');

    if (!prefix || !token) {
      throw new BadRequestException('invalid token*1');
    }

    const { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } = this.getSecret(
      prefix!
    );

    const verify = this.verifyToken({
      token: token!,
      options: {
        secret:
          tokenType == TokenTypeEnum.access_token
            ? SECRET_ACCESS_TOKEN
            : SECRET_REFRESH_TOKEN,
      },
    });

    if (!verify?.userId) throw new BadRequestException('invalidToken');

    const { user, decoded } = await this.decodedAndUserData(verify, token!);

    return { user, decoded };
  }

  async decodedAndUserData(verify: any, token: string) {
    const user = await this.userRepo.findById({
      id: verify.userId,
    });
    if (!user) throw new BadRequestException('user does not exists');
    if (user!.credentials && user!.credentials < verify.iat * 1000) {
      throw new BadRequestException('token revoked please login again');
    }

    const CachedRevokeToken = await this.redisServices.getKey({
      key: this.redisServices.cacheKey({
        filter: token!,
        subject: cacheKeyEnum.revokeToken,
      }),
    });
    if (CachedRevokeToken)
      throw new BadRequestException('token revoked please login again');

    return { user, decoded: verify };
  }

  getSecret(prefix: string) {
    if (!prefix) throw new BadRequestException('invalid token');

    let SECRET_ACCESS_TOKEN = '';
    let SECRET_REFRESH_TOKEN = '';
    if (prefix == process.env.TOKEN_USER_PREFIX) {
      SECRET_ACCESS_TOKEN = process.env.SECRET_USER_ACCESS_TOKEN!;
      SECRET_REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN!;
    } else if (prefix == process.env.TOKEN_ADMIN_PREFIX) {
      SECRET_ACCESS_TOKEN = process.env.SECRET_ADMIN_ACCESS_TOKEN!;
      SECRET_REFRESH_TOKEN = process.env.SECRET_ADMIN_REFRESH_TOKEN!;
    } else throw new BadRequestException('invalid token*2');

    return { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN };
  }
}

export default jwtServices;
