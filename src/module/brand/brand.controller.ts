import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import brandServices from './brand.service';
import { type HUDoc } from '../../DataBase/models/user/user.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUpload } from '../../common/middleWare/multer.fileUpload';
import { multerFileEnum } from '../../common/enum/multer.base.enum';
import { User } from '../../common/decorators/user.decorator';
import createBrandDto from './brandDTO/createBrand.dto';
import { AuthDecorators } from '../../common/decorators/Token.decorator';
import { roleEnum } from '../../common/enum/user.enum';
import { updateBrandDto } from './brandDTO/update.brand.dto';
import { getAllBrandsQuery } from './brandDTO/getAll.dto';
import { Types } from 'mongoose';
@Controller('/brand')
class brandController {
  constructor(private readonly _brandServices: brandServices) {}

  @Post('/create-brand')
  @UseInterceptors(
    FileInterceptor(
      'attachment',
      fileUpload({ fileType: multerFileEnum.image })
    )
  )
  @AuthDecorators({
    accessRole: [roleEnum.admin],
  })
  createBrand(
    @UploadedFile() file: Express.Multer.File,
    @User() user: HUDoc,
    @Body() body: createBrandDto
  ) {
    return this._brandServices.createBrand(body, user, file);
  }

  @Put('/update-brand/:id')
  @AuthDecorators({
    accessRole: [roleEnum.admin, roleEnum.user],
  })
  updateBrand(
    @Param('id') brandId: Types.ObjectId,
    @User() user: HUDoc,
    @Body() body: updateBrandDto
  ) {
    return this._brandServices.updateBrand(brandId, body, user);
  }

  @Get('/get-all-brands')
  @AuthDecorators({
    accessRole: [roleEnum.admin, roleEnum.user],
  })
  getAllBrands(@Query() query: getAllBrandsQuery) {
    return this._brandServices.getAllBrands(query);
  }

  @Get('/get-brand/:id')
  @AuthDecorators({
    accessRole: [roleEnum.admin, roleEnum.user],
  })
  getBrand(@Param('id') id: Types.ObjectId) {
    return this._brandServices.getBrand(id);
  }

  @Get('/delete-brand/:id')
  @AuthDecorators({
    accessRole: [roleEnum.admin, roleEnum.user],
  })
  deleteBrand(@Param('id') id: Types.ObjectId, @User() user: HUDoc) {
    return this._brandServices.deleteBrand(id, user);
  }
}

export default brandController;
