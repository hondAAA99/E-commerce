import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
declare class jwtServices {
    private readonly JWTService;
    constructor();
    generateToken({ payload, options, }: {
        payload: object;
        options: JwtSignOptions;
    }): Promise<string>;
    verifyToken({ token, options, }: {
        token: string;
        options: JwtVerifyOptions;
    }): any;
}
export default jwtServices;
