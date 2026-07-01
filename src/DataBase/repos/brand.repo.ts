import { Injectable } from '@nestjs/common';
import repoBase from './repo.base';
import { Brand } from '../models/brand/brand.model';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
class brandRepo extends repoBase<Brand> {
  constructor(
    @InjectModel(Brand.name)
    private readonly _brandModel = mongoose.models.brands
  ) {
    super(_brandModel);
  }
}

export default brandRepo;
