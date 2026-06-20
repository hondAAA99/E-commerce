import mongoose from 'mongoose';
import repoBase from './repo.base.js';
import { HUDoc, User } from '../models/user/user.model.js';
declare class userRepo extends repoBase<User> {
    protected _model: mongoose.Model<any, {}, {}, {}, any, any, any>;
    constructor(_model?: mongoose.Model<any, {}, {}, {}, any, any, any>);
    userExists: (email: string, checkFor: string) => Promise<HUDoc | null>;
}
export default userRepo;
