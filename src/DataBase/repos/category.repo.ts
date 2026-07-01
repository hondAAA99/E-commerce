import mongoose from 'mongoose';
import { category } from '../models/category/category.model';
import repoBase from './repo.base';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
class categoryRepo extends repoBase<category> {
  constructor(
    @InjectModel(category.name)
    protected readonly _model = mongoose.models.categories
  ) {
    super(_model);
  }
}

export default categoryRepo;
