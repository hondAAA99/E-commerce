import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User } from '../../common/decorators/user.decorator';
import { type HUDoc } from '../../DataBase/models/user/user.model';
import createCategoryBody from './category.dto/createCategory.dto';
import categoryServices from './category.service';
import { AuthDecorators } from '../../common/decorators/Token.decorator';
import { roleEnum } from '../../common/enum/user.enum';
import { Types } from 'mongoose';
import updateCategoryDto from './category.dto/update.dto';

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

  @Put('/update-category/:id')
  @AuthDecorators({
    accessRole: [roleEnum.admin],
  })
  updateBrand(
    @Param('id') id: Types.ObjectId,
    @User() user: HUDoc,
    @Body() body: updateCategoryDto
  ) {
    return this._categoryServices.updateCategory(id, user, body);
  }

  @Get('/get-Category/:id')
  @AuthDecorators({
    accessRole: [roleEnum.admin, roleEnum.user],
  })
  getCategory(@Param('id') id: Types.ObjectId) {
    return this._categoryServices.getCategory(id);
  }

  @Get('/delete-Category/:id')
  @AuthDecorators({
    accessRole: [roleEnum.admin],
  })
  deleteCategory(@Param('id') id: Types.ObjectId, @User() user: HUDoc) {
    return this._categoryServices.deleteCategory(id, user);
  }

  @Get('/get-all-Categories')
  @AuthDecorators({
    accessRole: [roleEnum.admin, roleEnum.user],
  })
  getAllCategorys(@Query() limit: number, page: number, search: any) {
    return this._categoryServices.getAllCategories(limit, page, search);
  }
}
export default categoryController;
