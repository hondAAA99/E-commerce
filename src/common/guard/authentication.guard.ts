import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ErrorBadRequest } from '../globalresponse';
import jwtServices from '../services/jsonWebTokens';
import { Reflector } from '@nestjs/core';
import { TokenTypeEnum } from '../enum/token.enum';
import { tokenTypeKey } from '../decorators/Token.decorator';

@Injectable()
class authenticationGuard implements CanActivate {
  constructor(
    private readonly jwtServices: jwtServices,
    public reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let req: any;
    let authorization: any;

    let tokenType: string =
      this.reflector.get(tokenTypeKey, context.getHandler()) ==
      TokenTypeEnum.access_token
        ? TokenTypeEnum.access_token
        : TokenTypeEnum.refresh_token;

    if (context.getType() === 'http') {
      req = context.switchToHttp().getRequest();
      authorization = req.headers.authorization;
    } else if (context.getType() === 'rpc') {
      //   req = context.switchToRpc().getContext;
      //   authorization = req.headers.authorization;
    } else {
      req = context.switchToWs().getClient;
      //   authorization = req.headers.authorization;
    }

    if (!authorization) throw new ErrorBadRequest('invalid token');

    try {
      const { user, decoded } = await this.jwtServices.authenticateUtilts(
        authorization,
        tokenType
      );
      req.user = user;
      req.decoded = decoded;
      return true;
    } catch (err) {
      throw new InternalServerErrorException('invalid signature');
    }
  }
}

export default authenticationGuard;
