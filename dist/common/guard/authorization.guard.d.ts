import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare class authorizationGuard implements CanActivate {
    reflector: Reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export default authorizationGuard;
