import bcrypt from 'bcrypt';

export function globalHash(plainText: string) {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(plainText, salt);
}
export function globalCompare(plainText: string, hashText: string) {
  return bcrypt.compareSync(plainText, hashText);
}
