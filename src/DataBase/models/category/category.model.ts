import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { softDeletion } from '../globlalhooks';

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  strict: true,
  strictQuery: true,
})
class category {
  @Prop({ type: String, required: true, unique: true })
  name: string;
  @Prop({ type: String })
  brands: Types.ObjectId[];
  @Prop({ type: String })
  createdBy: Types.ObjectId;
  @Prop({ type: String })
  deletedAt: Date;
  @Prop({ type: String })
  deletedBy: Date;
  @Prop({ type: String })
  updatedBy: Date;
}

const categortScheam = SchemaFactory.createForClass(category);
softDeletion(categortScheam);

type HCDoc = HydratedDocument<category>;
const CategoryDataBaseModule = MongooseModule.forFeature([
  { name: category.name, schema: categortScheam },
]);

export { type HCDoc, categortScheam, CategoryDataBaseModule, category };
