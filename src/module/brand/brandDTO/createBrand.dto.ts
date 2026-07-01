import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Types } from 'mongoose';

class createBrandDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  BrandName: string;
  @IsMongoId()
  @IsNotEmpty()
  createdBy: Types.ObjectId;

  @IsString()
  @IsOptional()
  slogan: string;
}

export default createBrandDto;
