import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { Types } from 'mongoose';
import { checkIds } from '../../../common/decorators/validation.decorators';

class createCategoryBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Validate(checkIds)
  brands: Types.ObjectId[];
}

export default createCategoryBody;
