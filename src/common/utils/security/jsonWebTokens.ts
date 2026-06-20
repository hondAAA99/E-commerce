import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

@Injectable()
class jwtServices {
  private readonly JWTService: JwtService;
  constructor() {}

  generateToken({
    payload,
    options,
  }: {
    payload: object;
    options: JwtSignOptions;
  }): string {
    return this.JWTService.sign(payload, options);
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
}

export default jwtServices;
