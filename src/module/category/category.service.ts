import { Body, Injectable } from '@nestjs/common';
import { User } from '../../common/decorators/user.decorator';
import { type HUDoc } from '../../DataBase/models/user/user.model';
import createBrandDto from '../brand/brandDTO/createBrand.dto';
import createCategoryBody from './category.dto/createCategory.dto';
import categoryRepo from '../../DataBase/repos/category.repo';
import { Errorforbidden } from '../../common/globalresponse';
import { HCDoc } from '../../DataBase/models/category/category.model';
import { Types } from 'mongoose';

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
}

export default categoryServices;
