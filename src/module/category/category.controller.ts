import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../../common/decorators/user.decorator';
import { type HUDoc } from '../../DataBase/models/user/user.model';
import createCategoryBody from './category.dto/createCategory.dto';
import categoryServices from './category.service';
import { AuthDecorators } from '../../common/decorators/Token.decorator';
import { roleEnum } from '../../common/enum/user.enum';

@Controller('/category')
class categoryController {
  constructor(private readonly _categoryServices: categoryServices) {}

  @Post('create')
  @AuthDecorators({
    accessRole: [roleEnum.admin],
  })
  createCategory(@Body() body: createCategoryBody, @User() user: HUDoc) {
    return this._categoryServices.createCategory(body, user);
  }
}
export default categoryController;
