import { CanActivate, ExecutionContext } from '@nestjs/common';
import jwtServices from '../services/jsonWebTokens';
import { Reflector } from '@nestjs/core';
declare class authenticationGuard implements CanActivate {
    private readonly jwtServices;
    reflector: Reflector;
    constructor(jwtServices: jwtServices, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export default authenticationGuard;
