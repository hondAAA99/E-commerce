import { PartialType } from '@nestjs/mapped-types';
import createBrandDto from './createBrand.dto';
import { isExists } from '../../../common/decorators/validation.decorators';
import { Schema } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@isExists(['name', 'slogan'])
export class updateBrandDto extends PartialType(createBrandDto) {}

export class ParamsidDto {
  @IsMongoId()
  @IsNotEmpty()
  brandId: Schema.Types.ObjectId;
}
