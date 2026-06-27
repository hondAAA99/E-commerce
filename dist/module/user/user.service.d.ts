import { signUpDTO } from './userDTO/createUser.dto';
import userRepo from '../../DataBase/repos/user.repo';
import { HUDoc } from '../../DataBase/models/user/user.model';
import redisService from '../../common/services/redis.services';
import { signInDTO } from './userDTO/signInDTO';
import jwtServices from '../../common/utils/security/jsonWebTokens';
declare class userServices {
    private readonly _userModel;
    private readonly _redis;
    private readonly jwtServices;
    constructor(_userModel: userRepo, _redis: redisService, jwtServices: jwtServices);
    signUp: (body: signUpDTO) => Promise<HUDoc>;
    logIn: (body: signInDTO) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
export default userServices;
