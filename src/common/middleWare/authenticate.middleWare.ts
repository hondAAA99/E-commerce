// import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
// import type { NextFunction, Request, Response } from 'express';
// import jwtServices from '../services/jsonWebTokens';

// @Injectable()
// class Authenticate implements NestMiddleware {
//   constructor(private readonly JWTServices: jwtServices) {}
//   async use(req: Request, res: Response, next: NextFunction) {
//     if (!req.headers.authorization)
//       throw new ForbiddenException('invalid token');
//     const { user, decoded } = await this.JWTServices.authenticateUtilts(
//       req.headers.authorization!
//     );

//     req.user = user;
//     req.tokenDecoded = decoded;
//     next();
//   }
// }
