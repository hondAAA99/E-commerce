import crypto from 'node:crypto';

export function globalEncryption(plainText: string) {
  const iv = crypto.randomBytes(Number(process.env.RANDOM_IV!));
  const cipherIv = crypto.createCipheriv(
    process.env.CIPHER_ALGO!,
    process.env.ENCRYPTION_KEY!,
    iv
  );

  let cipherText = cipherIv.update(plainText, 'utf-8', 'hex');

  cipherText += cipherIv.final('hex');

  return `${iv}:${cipherText}`;
}

export function globalDecryption(cipherText: string) {
  const [iv, cipher] = cipherText.split(':');
  const decipher = crypto.createDecipheriv(
    process.env.CIPHER_ALGO!,
    process.env.ENCRYPTION_KEY!,
    iv
  );

  let plainText = decipher.update(cipher, 'hex', 'utf-8');
  plainText += decipher.final('utf-8');

  return plainText;
}
