import { Body, HttpException, Injectable } from '@nestjs/common';
import { User } from '../../common/decorators/user.decorator';
import { type HUDoc } from '../../DataBase/models/user/user.model';
import createCategoryBody from './category.dto/createCategory.dto';
import categoryRepo from '../../DataBase/repos/category.repo';
import {
  Errorforbidden,
  ErrorInternalServerError,
} from '../../common/globalresponse';
import { Types } from 'mongoose';
import updateCategoryDto from './category.dto/update.dto';

@Injectable()
class categoryServices {
  constructor(private readonly _categoryRepo: categoryRepo) {}

  async createCategory(@Body() body: createCategoryBody, @User() user: HUDoc) {
    const { brands, name } = body;

    if (await this._categoryRepo.findOne({ filter: { name } })) {
      return Errorforbidden('category name is exists');
    }

    let strictIds = ([...(new Set(brands) || [])] as any[]).map((id) =>
      Types.ObjectId.createFromHexString(id)
    );

    if (
      (await (
        this._categoryRepo.findAll({
          filter: { id: { $in: strictIds } },
        }) as any
      ).length) != strictIds.length
    ) {
    }

    const category = await this._categoryRepo.create({
      brands,
      name,
      createdBy: user._id,
    });

    return category;
  }

  async getCategory(id: Types.ObjectId) {
    const category = this._categoryRepo
      .findById({ id })
      .catch((err) =>
        ErrorInternalServerError(
          'failed to find Category due to database error'
        )
      );

    if (!category) throw new HttpException('Category not found', 404);

    return { category };
  }

  async updateCategory(
    id: Types.ObjectId,
    user: HUDoc,
    body: updateCategoryDto
  ) {
    let { brands, name } = body;

    const Category = this._categoryRepo
      .findByIdAndUpdate({
        id,
        update: {
          updatedBy: user.id,
          ...(name ? { name } : undefined),
          ...(brands ? { brands } : undefined),
        },
      })
      .catch((err) =>
        ErrorInternalServerError(
          'failed to find Category due to database error'
        )
      );
    if (!Category) throw new HttpException('Category not found', 404);

    return { Category };
  }

  async deleteCategory(id: Types.ObjectId, user: HUDoc) {
    const category = this._categoryRepo
      .findByIdAndUpdate({
        id,
        update: { deletedBy: user.id, deletedAt: Date.now() },
      })
      .catch((err) => ErrorInternalServerError('error due to dataBase'));

    if (!category)
      throw new HttpException(
        'failed to delete the brand due to un-exists',
        404
      );

    return 'category deleted';
  }

  async getAllCategories(limit: number, page: number, search: any) {
    const category = this._categoryRepo
      .paginate({
        limit,
        page,
        search: search
          ? {
              $in: [{ name: { $regex: search, options: 'i' } }],
            }
          : {},
      })
      .catch((err) =>
        ErrorInternalServerError(
          'failed to find Category due to database error'
        )
      );

    if (!category) throw new HttpException('Category not found', 404);

    return { category };
  }
}

export default categoryServices;
