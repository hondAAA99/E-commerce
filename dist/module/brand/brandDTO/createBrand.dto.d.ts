import { Types } from 'mongoose';
declare class createBrandDto {
    BrandName: string;
    createdBy: Types.ObjectId;
    slogan: string;
}
export default createBrandDto;
