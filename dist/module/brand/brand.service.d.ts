import userRepo from '../../DataBase/repos/user.repo';
import s3services from '../../common/services/s3Services';
import brandRepo from '../../DataBase/repos/brand.repo';
import createBrandDto from './brandDTO/createBrand.dto';
import { HUDoc } from '../../DataBase/models/user/user.model';
import { ParamsidDto, updateBrandDto } from './brandDTO/update.brand.dto';
declare class brandServices {
    private readonly _brandModel;
    private readonly _userModel;
    private readonly s3Services;
    constructor(_brandModel: brandRepo, _userModel: userRepo, s3Services: s3services);
    createBrand(body: createBrandDto, User: HUDoc, file: Express.Multer.File): Promise<void | (import("mongoose").Document<unknown, {}, import("../../DataBase/models/brand/brand.model").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("../../DataBase/models/brand/brand.model").Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })>;
    updateBrand(brandId: ParamsidDto, body: updateBrandDto, user: HUDoc): Promise<void | (import("mongoose").Document<unknown, {}, import("../../DataBase/models/brand/brand.model").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("../../DataBase/models/brand/brand.model").Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
export default brandServices;
