import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { genderEnum, roleEnum } from '../../../common/enum/user.enum';
import { HydratedDocument } from 'mongoose';
import { saveHook } from './schema.hooks';
import { softDeletion } from '../globlalhooks';

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  strict: true,
  strictQuery: true,
})
export class User {
  @Prop({ type: String, required: true, trim: true })
  userName: string;

  @Prop({ type: String, required: true, trim: true })
  email: string;

  @Prop({ type: String, required: true, trim: true })
  password: string;

  @Prop({ type: String, enum: genderEnum })
  gender: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String, trim: true })
  address: string;

  @Prop({ type: Number, trim: true })
  age: number;

  @Prop({ type: String, trim: true })
  profilePicture: string;

  @Prop({ type: String, default: roleEnum.user, enum: roleEnum })
  role: string;

  @Prop({ type: Number })
  credentials: number;

  @Prop({ type: Boolean })
  confirmed: Boolean;
}

export const userSchema = SchemaFactory.createForClass(User);
saveHook(userSchema);
softDeletion(userSchema);
export type HUDoc = HydratedDocument<User>;
export const userDataBaseModule = MongooseModule.forFeature([
  { name: User.name, schema: userSchema },
]);
