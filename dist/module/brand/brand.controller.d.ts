import brandServices from './brand.service';
import { type HUDoc } from '../../DataBase/models/user/user.model';
import createBrandDto from './brandDTO/createBrand.dto';
import { ParamsidDto, updateBrandDto } from './brandDTO/update.brand.dto';
declare class brandController {
    private readonly _brandServices;
    constructor(_brandServices: brandServices);
    createBrand(file: Express.Multer.File, user: HUDoc, body: createBrandDto): Promise<void | (import("mongoose").Document<unknown, {}, import("../../DataBase/models/brand/brand.model").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("../../DataBase/models/brand/brand.model").Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })>;
    updateBrand(brandId: ParamsidDto, user: HUDoc, body: updateBrandDto): Promise<void | (import("mongoose").Document<unknown, {}, import("../../DataBase/models/brand/brand.model").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("../../DataBase/models/brand/brand.model").Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
export default brandController;
