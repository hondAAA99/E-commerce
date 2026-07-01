import { Schema } from 'mongoose';

export function softDeletion(schema: Schema) {
  schema.pre(['findOne', 'find'], function () {
    const filter = this.getFilter();
    if (filter.paranoid)
      this.setQuery({ ...filter, deletedAt: { $exists: true } });
  });
}
