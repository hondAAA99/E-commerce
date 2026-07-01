import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
declare class jwtServices {
    private readonly JWTService;
    private readonly redisServices;
    private readonly userRepo;
    constructor();
    generateToken({ payload, options, }: {
        payload: object;
        options: JwtSignOptions;
    }): Promise<string>;
    verifyToken({ token, options, }: {
        token: string;
        options: JwtVerifyOptions;
    }): any;
    authenticateUtilts(authorization: string, tokenType: string): Promise<{
        user: import("mongoose").Document<unknown, {}, import("../../DataBase/models/user/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../DataBase/models/user/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
        decoded: any;
    }>;
    decodedAndUserData(verify: any, token: string): Promise<{
        user: import("mongoose").Document<unknown, {}, import("../../DataBase/models/user/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../DataBase/models/user/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
        decoded: any;
    }>;
    getSecret(prefix: string): {
        SECRET_ACCESS_TOKEN: string;
        SECRET_REFRESH_TOKEN: string;
    };
}
export default jwtServices;
