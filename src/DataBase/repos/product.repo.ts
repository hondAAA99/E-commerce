import { Injectable } from '@nestjs/common';
import repoBase from './repo.base';
import { product } from '../models/product/product.model';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
class productRepo extends repoBase<product> {
  constructor(
    @InjectModel(product.name)
    protected readonly _model = mongoose.models.products
  ) {
    super(_model);
  }
}

export default productRepo;
