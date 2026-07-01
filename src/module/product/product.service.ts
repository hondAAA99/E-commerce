import { Body, Injectable } from '@nestjs/common';
import { User } from '../../common/decorators/user.decorator';
import { type HUDoc } from '../../DataBase/models/user/user.model';
import createProduct from './product.dto/create.product.dto';
import brandRepo from '../../DataBase/repos/brand.repo';
import categoryRepo from '../../DataBase/repos/category.repo';
import productRepo from '../../DataBase/repos/product.repo';
import { ErrorBadRequest } from '../../common/globalresponse';
import s3services from '../../common/services/s3Services';

@Injectable()
class productServices {
  constructor(
    private readonly _brandRepo: brandRepo,
    private readonly _categoryRepo: categoryRepo,
    private readonly _productRepo: productRepo,
    private readonly _s3Services: s3services
  ) {}

  async createProduct(
    user: HUDoc,
    body: createProduct,
    files: { mainImg: Express.Multer.File; subImgs: Express.Multer.File[] }
  ) {
    let {
      Name,
      brandId,
      categoryId,
      description,
      discount,
      slug,
      stock,
      price,
    } = body;

    const [brandExists, categoryExists] = await Promise.all([
      this._brandRepo.findById({ id: brandId }),
      this._categoryRepo.findById({ id: { categoryId } }),
    ]);

    if (!brandExists || !categoryExists) {
      return ErrorBadRequest('brand or category names is not exists');
    }

    price = price - (price * (discount || 0)) / 100;

    let [img, subImg] = await Promise.all([
      this._s3Services.uploadFile({
        file: files.mainImg,
        path: `products/${brandId}/${Name + Math.floor(Math.random() * 100000)}`,
      }),
      this._s3Services.uploadFiles({
        files: files.subImgs,
        path: `products/${brandId}/${Name + Math.floor(Math.random() * 100000)}`,
      }),
    ]);

    let product = this._productRepo.create({
      Name,
      brandId,
      categoryId,
      description,
      discount,
      slug,
      stock,
      img,
      subImg,
      price,
    });

    return product;
  }
}

export default productServices;
