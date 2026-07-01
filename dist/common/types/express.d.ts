import jsonwebtoken from 'jsonwebtoken';
declare global {
    namespace Express {
        interface Request {
            user?: any;
            token: string;
            tokenDecoded: jsonwebtoken.JwtPayload;
        }
    }
}
