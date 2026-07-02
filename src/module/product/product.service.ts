import { Body, HttpException, Injectable } from '@nestjs/common';
import { User } from '../../common/decorators/user.decorator';
import { type HUDoc } from '../../DataBase/models/user/user.model';
import createProduct from './product.dto/create.product.dto';
import brandRepo from '../../DataBase/repos/brand.repo';
import categoryRepo from '../../DataBase/repos/category.repo';
import productRepo from '../../DataBase/repos/product.repo';
import {
  ErrorBadRequest,
  ErrorInternalServerError,
} from '../../common/globalresponse';
import s3services from '../../common/services/s3Services';
import { Types } from 'mongoose';
import updateProductDto from './product.dto/update.dto';
import { roleEnum } from '../../common/enum/user.enum';

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
      createdAt: Date.now(),
      createdBy: user._id,
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

  async getProduct(id: Types.ObjectId) {
    const product = this._productRepo
      .findById({ id })
      .catch((err) =>
        ErrorInternalServerError('failed to find product due to database error')
      );

    if (!product) throw new HttpException('product not found', 404);

    return { product };
  }

  async updateProduct(id: Types.ObjectId, user: HUDoc, body: updateProductDto) {
    let { Name, categoryId, description, discount, slug, stock, price } = body;

    const product = this._productRepo
      .findOneAndUpdate({
        filter: {
          id,
          createdBy: user.role == roleEnum.admin ? undefined : user._id,
        },
        update: {
          updatedBy: user.id,
          ...(Name ? { Name } : undefined),
          ...(categoryId ? { categoryId } : undefined),
          ...(description ? { description } : undefined),
          ...(discount ? { discount } : undefined),
          ...(slug ? { slug } : undefined),
          ...(stock ? { stock } : undefined),
          ...(price ? { price } : undefined),
        },
      })
      .catch((err) =>
        ErrorInternalServerError('failed to find product due to database error')
      );
    if (!product) throw new HttpException('product not found', 404);

    return { product };
  }

  async deleteProduct(id: Types.ObjectId, user: HUDoc) {
    const brand = this._productRepo
      .findOneAndUpdate({
        filter: {
          id,
          createdBy: user.role == roleEnum.admin ? undefined : user._id,
        },
        update: { deletedBy: user.id, deletedAt: Date.now() },
      })
      .catch((err) => ErrorInternalServerError('error due to dataBase'));

    if (!brand)
      throw new HttpException(
        'failed to delete the brand due to unexistance',
        404
      );

    return 'p deleted';
  }

  async getAllProduct(limit: number, page: number, search: any) {
    const product = this._productRepo
      .paginate({
        limit,
        page,
        search: search
          ? {
              $in: [
                { name: { $regex: search, options: 'i' } },
                { description: { $regex: search, options: 'i' } },
              ],
            }
          : {},
      })
      .catch((err) =>
        ErrorInternalServerError('failed to find product due to database error')
      );

    if (!product) throw new HttpException('product not found', 404);

    return { product };
  }
}

export default productServices;
