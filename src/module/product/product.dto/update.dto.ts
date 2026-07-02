import { PartialType } from '@nestjs/mapped-types';
import createProduct from './create.product.dto';

class updateProductDto extends PartialType(createProduct) {}

export default updateProductDto