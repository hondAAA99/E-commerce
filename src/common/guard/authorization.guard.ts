import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { rolesKey } from '../decorators/Token.decorator';

@Injectable()
class authorizationGuard implements CanActivate {
  constructor(public reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let req: any;
    const roles = this.reflector.get(rolesKey, context.getHandler) as string[];

    if (context.getType() === 'http') {
      req = context.switchToHttp().getRequest();
    } else if (context.getType() === 'rpc') {
      //   req = context.switchToRpc().getContext;
    } else {
      req = context.switchToWs().getClient;
    }

    if (!roles.includes(req.user.role))
      throw new UnauthorizedException(
        'you are not allowed to access this operation'
      );

    return true;
  }
}

export default authorizationGuard;
