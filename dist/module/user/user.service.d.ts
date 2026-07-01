import { signUpDTO } from './userDTO/createUser.dto';
import userRepo from '../../DataBase/repos/user.repo';
import { HUDoc } from '../../DataBase/models/user/user.model';
import redisService from '../../common/services/redis.services';
import { signInDTO } from './userDTO/signInDTO';
import jwtServices from '../../common/services/jsonWebTokens';
import s3services from '../../common/services/s3Services';
declare class userServices {
    private readonly _userModel;
    private readonly _redis;
    private readonly jwtServices;
    private readonly s3Services;
    constructor(_userModel: userRepo, _redis: redisService, jwtServices: jwtServices, s3Services: s3services);
    signUp: (body: signUpDTO) => Promise<HUDoc>;
    logIn: (body: signInDTO) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    upload: (file: Express.Multer.File) => Promise<string>;
    uploadLargeFile: (file: Express.Multer.File) => Promise<() => Promise<import("@aws-sdk/client-s3").CompleteMultipartUploadCommandOutput>>;
}
export default userServices;
