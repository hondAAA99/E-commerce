import userService from './user.service';
import { signUpDTO } from './userDTO/createUser.dto';
import { signInDTO } from './userDTO/signInDTO';
import type { HUDoc } from '../../DataBase/models/user/user.model';
declare class userController {
    private readonly _userServices;
    constructor(_userServices: userService);
    signUp(body: signUpDTO): any;
    signIn(body: signInDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getUser(user: HUDoc): {
        user: import("mongoose").Document<unknown, {}, import("../../DataBase/models/user/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../DataBase/models/user/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    };
    uploadFile(file: Express.Multer.File): (file: Express.Multer.File) => Promise<string>;
    uploadLageFile(file: Express.Multer.File): (file: Express.Multer.File) => Promise<() => Promise<import("@aws-sdk/client-s3").CompleteMultipartUploadCommandOutput>>;
}
export default userController;
