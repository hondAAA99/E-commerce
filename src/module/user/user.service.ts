import { HttpException, Injectable } from '@nestjs/common';
import { signUpDTO } from './userDTO/createUser.dto';
import userRepo from '../../DataBase/repos/user.repo';
import { globalCompare } from '../../common/utils/security/hash';
import { type HUDoc } from '../../DataBase/models/user/user.model';
import redisService from '../../common/services/redis.services';
import { signInDTO } from './userDTO/signInDTO';
import jwtServices from '../../common/services/jsonWebTokens';
import { roleEnum } from '../../common/enum/user.enum';
import crypto from 'node:crypto';
import s3services from '../../common/services/s3Services';
import { sendEmail } from '../../common/utils/email/sendEmail';
import mailEnum from '../../common/enum/mail.enum';
import confirmUserDto from './userDTO/cofirmUser';
import cacheKeyEnum from '../../common/enum/redis.base.enum';

@Injectable()
class userServices {
  constructor(
    private readonly _userModel: userRepo,
    private readonly _redis: redisService,
    private readonly jwtServices: jwtServices,
    private readonly s3Services: s3services
  ) {}

  async signUp(body: signUpDTO): Promise<HUDoc> {
    const { password, email, userName, address, age, gender, phone } = body;

    if (await this._userModel.findOne({ filter: { email } })) {
      throw new HttpException('the email is not unique', 302);
    }
    const user = await this._userModel.create({
      userName,
      email,
      password,
      address,
      age,
      gender,
      phone,
    });

    sendEmail({
      to: email,
      subject: mailEnum.confirmSingUp,
      data: Math.ceil(Math.random() * 10000),
    });

    return user;
  }

  async logIn(body: signInDTO) {
    const { email, password } = body;
    const user = await this._userModel.findOne({
      filter: { email, confirmed: { $exists: true } },
    });
    if (!user) throw new HttpException('user not found', 305);
    if (!globalCompare(password, user?.password))
      throw new HttpException('incorrect password', 305);

    const accessToken = await this.jwtServices.generateToken({
      payload: { userId: user.id, userRole: user.role },
      options: {
        secret:
          user.role == roleEnum.user
            ? process.env.SECRET_USER_ACCESS_TOKEN
            : process.env.SECRET_USER_ACCESS_TOKEN,

        expiresIn: '1day',
        jwtid: crypto.randomUUID(),
      },
    });

    const refreshToken = await this.jwtServices.generateToken({
      payload: { userId: user.id, userRole: user.role },
      options: {
        secret:
          user.role == roleEnum.user
            ? process.env.SECRET_USER_REFRESH_TOKEN
            : process.env.SECRET_ADMIN_REFRESH_TOKEN,

        expiresIn: '1day',
        jwtid: crypto.randomUUID(),
      },
    });

    return { accessToken, refreshToken };
  }

  async confirmEmail(body: confirmUserDto) {
    const { email, otp } = body;
    const user = await this._userModel.findOne({ filter: { email } });
    if (!user) throw new HttpException('user is not found', 404);
    const cahchedOtp = await this._redis.getKey({
      key: this._redis.cacheKey({
        filter: email,
        subject: cacheKeyEnum.confirmSingUp,
      }),
    });
    if (!cahchedOtp) throw new HttpException('internal server error', 500);
    if (!globalCompare(otp, cahchedOtp))
      throw new HttpException('wrong otp', 400);

    user.confirmed = true;
    return user;
  }

  async reSendOtp(flag: string, email: string) {
    sendEmail({
      to: email,
      subject: mailEnum[flag],
      data: Math.ceil(Math.random() * 10000),
    });

    return 'otp has sent to the email';
  }

  async reGenerateAccessToken(user: HUDoc) {
    return {
      refreshToken: this.jwtServices.generateToken({
        payload: { userId: user.id, userRole: user.role },
        options: {
          secret:
            user.role == roleEnum.user
              ? process.env.SECRET_USER_ACCESS_TOKEN
              : process.env.SECRET_USER_ACCESS_TOKEN,

          expiresIn: '1day',
          jwtid: crypto.randomUUID(),
        },
      }),
    };
  }

  async addAdmin(body: signUpDTO) {
    const { userName, email, password } = body;
    let user = await this._userModel.findOne({ filter: { email } });

    if (user) {
      if (!user?.confirmed) user.confirmed = true;
      user.role = roleEnum.admin;
      await user.save();
      return user;
    } else {
      user = await this._userModel.create({
        userName,
        email,
        password,
        confirmed: true,
        role: roleEnum.admin,
      });

      return user;
    }
  }

  async logout(flag: string, req: any) {
    const { user, decoded } = req;
    if (flag && flag == 'all') {
      user.credentials = Date.now();
      await Promise.all([
        user.save(),
        this._redis.deleteKey({
          key: this._redis.cacheKey({
            filter: user?.email,
            subject: cacheKeyEnum.revokeToken,
          }),
        }),
      ]);

      return 'logout success';
    } else {
      await this._redis.setKey({
        key: this._redis.cacheKey({
          filter: user.email,
          subject: cacheKeyEnum.revokeToken,
        }),
        value: decoded.jwtid,
        ttl: decoded.exp - Math.floor(Date.now() / 1000),
      });

      return 'logout success';
    }
  }
}

export default userServices;
