import userRepo from '../../DataBase/repos/user.repo';
declare class userServicesHelpers {
    private readonly _userModel;
    constructor(_userModel: userRepo);
}
export default userServicesHelpers;
