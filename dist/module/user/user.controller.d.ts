import userService from './user.service';
import { signUpDTO } from './userDTO/createUser.dto';
declare class userController {
    private readonly _userServices;
    constructor(_userServices: userService);
    signUp(body: signUpDTO): any;
}
export default userController;
