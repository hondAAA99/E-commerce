import userService from './user.service';
import { signUpDTO } from './userDTO/createUser.dto';
import { signInDTO } from './userDTO/signInDTO';
declare class userController {
    private readonly _userServices;
    constructor(_userServices: userService);
    signUp(body: signUpDTO): any;
    signIn(body: signInDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
export default userController;
