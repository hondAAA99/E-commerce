import { PartialType } from '@nestjs/mapped-types';
import createCategoryBody from './createCategory.dto';

class updateCategoryDto extends PartialType(createCategoryBody) {}

export default updateCategoryDto;
