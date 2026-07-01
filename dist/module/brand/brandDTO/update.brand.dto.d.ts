import createBrandDto from './createBrand.dto';
import { Schema } from 'mongoose';
declare const updateBrandDto_base: import("@nestjs/mapped-types").MappedType<Partial<createBrandDto>>;
export declare class updateBrandDto extends updateBrandDto_base {
}
export declare class ParamsidDto {
    brandId: Schema.Types.ObjectId;
}
export {};
