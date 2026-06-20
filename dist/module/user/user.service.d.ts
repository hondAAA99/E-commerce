import { signUpDTO } from './userDTO/createUser.dto';
import userRepo from '../../DataBase/repos/user.repo';
import { HUDoc } from '../../DataBase/models/user/user.model';
declare class userServices {
    private readonly _userModel;
    constructor(_userModel: userRepo);
    signUp: (body: signUpDTO) => Promise<HUDoc>;
}
export default userServices;
