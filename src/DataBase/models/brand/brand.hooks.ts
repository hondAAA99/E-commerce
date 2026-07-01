import { Schema, UpdateQuery } from 'mongoose';
import { Brand } from './brand.model';
import slugify from 'slugify';

export function updateHook(schema: Schema) {
  schema.pre(['updateOne', 'findOneAndUpdate'], function () {
    const update = this.getUpdate() as UpdateQuery<Brand>;
    if (update.BrandName)
      update.slug = slugify(update.BrandName, {
        replacement: '-',
        trim: true,
        lower: true,
      });
  });
}
