import { HttpException, Injectable } from '@nestjs/common';
import userRepo from '../../DataBase/repos/user.repo';
import redisService from '../../common/services/redis.services';
import jwtServices from '../../common/services/jsonWebTokens';
import s3services from '../../common/services/s3Services';
import brandRepo from '../../DataBase/repos/brand.repo';
import createBrandDto from './brandDTO/createBrand.dto';
import { HUDoc } from '../../DataBase/models/user/user.model';
import {
  ErrorBadRequest,
  Errorforbidden,
  ErrorInternalServerError,
} from '../../common/globalresponse';
import { ParamsidDto, updateBrandDto } from './brandDTO/update.brand.dto';
import { getAllBrandsQuery } from './brandDTO/getAll.dto';
import productRepo from '../../DataBase/repos/product.repo';
import { HydratedDocument, Types } from 'mongoose';
import { roleEnum } from '../../common/enum/user.enum';

@Injectable()
class brandServices {
  constructor(
    private readonly _brandModel: brandRepo,
    private readonly _userModel: userRepo,
    private readonly s3Services: s3services,
    private readonly _productsRepo: productRepo
  ) {}

  async createBrand(
    body: createBrandDto,
    User: HUDoc,
    file: Express.Multer.File
  ) {
    const { BrandName, createdBy } = body;
    await this._brandModel
      .findOne({ filter: { BrandName } })
      .then((val) => {
        if (val) {
          return Errorforbidden('brand name already exists');
        }
      })
      .catch((err) => {
        ErrorInternalServerError('failed to search on the database');
      });

    const url = await this.s3Services
      .uploadFile({
        file,
        path: `/brands-logo/${BrandName}-${Math.floor(Math.random() * 1000)}`,
      })
      .catch((err) => {
        return ErrorInternalServerError('failed to upload logo');
      });

    const brand = await this._brandModel
      .create({
        BrandName,
        createdBy,
        logo: url!,
      })
      .catch(async (err) => {
        await this.s3Services.deleteFile({
          Key: url!,
        });
        return ErrorInternalServerError('failed to create brand');
      });

    return brand;
  }

  async updateBrand(
    brandId: Types.ObjectId,
    body: updateBrandDto,
    user: HUDoc
  ) {
    const { BrandName, slogan } = body;

    const brand = await this._brandModel
      .findOne({ filter: { id: brandId, createdBy: user.id } })
      .catch((err) => {
        throw ErrorInternalServerError(
          'failed find the brand due to database error'
        );
      });

    if (!brand) {
      return ErrorBadRequest('can not find brand name');
    }

    if (user.role != roleEnum.admin || user._id != brand.createdBy) {
      return Errorforbidden('you are not authorized to update this brand');
    }
    if (BrandName && BrandName === brand.BrandName) {
      return ErrorBadRequest('cannot edit the brand name to the same name');
    }

    if (
      BrandName &&
      (await this._brandModel.findOne({ filter: { BrandName } }))
    ) {
      return ErrorBadRequest('cannot edit the brand because it is in use;');
    }

    const brandUpdate = await this._brandModel.findByIdAndUpdate({
      id: brandId,
      update: {
        ...(BrandName ? { BrandName } : undefined),
        ...(slogan ? { slogan } : undefined),
        updatedBy: user.id,
      },
    });

    return brandUpdate;
  }

  async getAllBrands(query: getAllBrandsQuery) {
    const { limit, page, search } = query;
    const brands = this._brandModel.paginate({
      limit,
      page,
      search: search
        ? {
            $in: [
              { name: { $regex: search, options: 'i' } },
              { slogan: { $regex: search, options: 'i' } },
            ],
          }
        : {},
    });

    return brands;
  }

  async getBrand(id: Types.ObjectId) {
    const brand = await this._brandModel
      .findById({
        id,
      })
      .catch((error) =>
        ErrorInternalServerError('internal server error due to database')
      );

    if (!brand) throw new HttpException('brand not found', 404);

    const products = this._productsRepo.findAll({ filter: { brandId: id } });

    return { brand, products };
  }

  async deleteBrand(id: Types.ObjectId, user: HUDoc) {
    const brand = this._brandModel
      .findOneAndUpdate({
        filter: {
          id,
          createdBy: user.role == roleEnum.admin ? undefined : user._id,
        },
        update: { deletedBy: user.id, deletedAt: Date.now() },
      })
      .catch((err) =>
        ErrorInternalServerError('error due to dataBase')
      ) as Promise<HydratedDocument<HUDoc> | null>;

    if (!brand)
      throw new HttpException(
        'failed to delete the brand due to un-existance ',
        404
      );

    return 'brand deleted';
  }
}

export default brandServices;
