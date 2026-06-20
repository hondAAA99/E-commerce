import mongoose from 'mongoose';
import { globalHash } from '../../../common/utils/security/hash';
import { globalEncryption } from '../../../common/utils/security/encypt';

export function saveHook(schema: mongoose.Schema) {
  schema.pre('save', function (this) {
    if (this.password) this.password = globalHash(this.password as string);
    if (this.phone) this.password = globalEncryption(this.phone as string);
  });
}

export function nullDataHook(schema: mongoose.Schema) {
  schema.post(['find', 'findOne'], function (this) {
    console.log(this);
  });
}
