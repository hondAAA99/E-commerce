import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { type HUDoc } from '../../DataBase/models/user/user.model';
import { User } from '../../common/decorators/user.decorator';
import { AuthDecorators } from '../../common/decorators/Token.decorator';
import { roleEnum } from '../../common/enum/user.enum';
import createProduct from './product.dto/create.product.dto';
import productRepo from '../../DataBase/repos/product.repo';
import productServices from './product.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  multerFileEnum,
  multerStorageEnum,
} from '../../common/enum/multer.base.enum';
import { fileUpload } from '../../common/middleWare/multer.fileUpload';
import { Types } from 'mongoose';
import updateProductDto from './product.dto/update.dto';

@Controller('/product')
class productController {
  constructor(private readonly _productServices: productServices) {}

  @Post('/create')
  @AuthDecorators({
    accessRole: [roleEnum.admin, roleEnum.user],
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'mainImg',
          maxCount: 1,
        },
        {
          name: 'subImgs',
          maxCount: 3,
        },
      ],
      fileUpload({
        fileType: multerFileEnum.image,
        storageType: multerStorageEnum.memory,
      })
    )
  )
  createProduct(
    @Body() body: createProduct,
    @User() user: HUDoc,
    @UploadedFiles()
    files: { mainImg: Express.Multer.File; subImgs: Express.Multer.File[] }
  ) {
    return this._productServices.createProduct(user, body, files);
  }

  @Put('/update-product/:id')
  @AuthDecorators({
    accessRole: [roleEnum.admin, roleEnum.user],
  })
  updateBrand(
    @Param('id') id: Types.ObjectId,
    @User() user: HUDoc,
    @Body() body: updateProductDto
  ) {
    return this._productServices.updateProduct(id, user, body);
  }

  @Get('/get-product/:id')
  @AuthDecorators({
    accessRole: [roleEnum.admin, roleEnum.user],
  })
  getproduct(@Param('id') id: Types.ObjectId) {
    return this._productServices.getProduct(id);
  }

  @Get('/delete-product/:id')
  @AuthDecorators({
    accessRole: [roleEnum.admin, roleEnum.user],
  })
  deleteproduct(@Param('id') id: Types.ObjectId, @User() user: HUDoc) {
    return this._productServices.deleteProduct(id, user);
  }

  @Get('/get-all-products')
  @AuthDecorators({
    accessRole: [roleEnum.admin, roleEnum.user],
  })
  getAllproducts(@Query() limit: number, page: number, search: any) {
    return this._productServices.getAllProduct(limit, page, search);
  }
}

export default productController;
