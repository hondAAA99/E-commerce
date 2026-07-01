import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

class createProduct {
  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  slug: string;
  @IsMongoId()
  @IsNotEmpty()
  brandId: Types.ObjectId;
  @IsMongoId()
  @IsNotEmpty()
  categoryId: Types.ObjectId;
  //       @IsMongoId()
  //   @IsNotEmpty()
  //   subCategoryId: Types.ObjectId;

  @IsNumber()
  @IsNotEmpty()
  stock: number;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNumber()
  @IsNotEmpty()
  discount: number;
}

export default createProduct;
