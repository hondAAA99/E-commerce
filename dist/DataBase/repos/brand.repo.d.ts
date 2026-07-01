import repoBase from './repo.base';
import { Brand } from '../models/brand/brand.model';
import mongoose from 'mongoose';
declare class brandRepo extends repoBase<Brand> {
    private readonly _brandModel;
    constructor(_brandModel?: mongoose.Model<any, {}, {}, {}, any, any, any>);
}
export default brandRepo;
