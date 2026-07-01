import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { softDeletion } from '../globlalhooks';

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  strict: true,
  strictQuery: true,
})
class product {
  @Prop({ type: String, required: true })
  Name: string;

  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: String })
  slug: string;
  @Prop({ type: Types.ObjectId, required: true })
  brandId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, required: true })
  categoryId: Types.ObjectId;
  //   @Prop({ type: Types.ObjectId, required: true })
  //   subCategoryId: Types.ObjectId;

  @Prop({ type: Date })
  createdAt: Date;
  @Prop({ type: Date })
  createdBy: Date;
  @Prop({ type: Date })
  deletedAt: Date;
  @Prop({ type: Date })
  deletedBy: Date;
  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Number, required: true })
  stock: number;
  @Prop({ type: Number })
  rate: number;
  @Prop({ type: Number })
  avgRate: number;
  @Prop({ type: Number })
  discount: number;
  @Prop({ type: Number })
  price: number;

  @Prop({ type: String, required: true })
  img: string;
  @Prop({ type: String })
  subImg: string[];
}

const productSchmea = SchemaFactory.createForClass(product);
softDeletion(productSchmea);
type HPDoc = HydratedDocument<product>;
const userDataBaseModule = MongooseModule.forFeature([
  { name: product.name, schema: productSchmea },
]);

export { product, userDataBaseModule, productSchmea, type HPDoc };
