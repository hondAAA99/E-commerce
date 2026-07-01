import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { genderEnum, roleEnum } from '../../../common/enum/user.enum';
import { HydratedDocument, Types } from 'mongoose';
import slugify from 'slugify';
import { updateHook } from './brand.hooks';
import { softDeletion } from '../globlalhooks';
@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  strict: true,
  strictQuery: true,
})
export class Brand {
  @Prop({ type: String, required: true, trim: true, unique: true })
  BrandName: string;

  @Prop({ type: String, required: true })
  logo: string;
  @Prop({ type: Types.ObjectId, required: true })
  createdBy: Types.ObjectId;
  @Prop({ type: Date })
  createdAt: Date;
  @Prop({
    type: String,
    default: function (this: Brand) {
      return slugify(this.BrandName, {
        replacement: '-',
        trim: true,
        lower: true,
      });
    },
  })
  slug: string;

  @Prop({ type: String })
  slogan: string;
  @Prop({ type: Date })
  updatedAt: Date;
  @Prop({ type: Date })
  deletedAt: Date;
  @Prop({ type: Date })
  deletedBy: Date;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
updateHook(BrandSchema);
softDeletion(BrandSchema);
export type HBDoc = HydratedDocument<Brand>;
export const BrandDataBaseModule = MongooseModule.forFeature([
  { name: Brand.name, schema: BrandSchema },
]);
