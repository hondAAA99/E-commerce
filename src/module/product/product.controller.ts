import {
  Body,
  Controller,
  Post,
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

@Controller('/product')
class productController {
  constructor(private readonly _productServices: productServices) {}

  @Post('/create')
  @AuthDecorators({
    accessRole: [roleEnum.admin],
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
}

export default productController;
