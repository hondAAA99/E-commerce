"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalEncryption = globalEncryption;
exports.globalDecryption = globalDecryption;
const node_crypto_1 = __importDefault(require("node:crypto"));
function globalEncryption(plainText) {
    const iv = node_crypto_1.default.randomBytes(Number(process.env.RANDOM_IV));
    const cipherIv = node_crypto_1.default.createCipheriv(process.env.CIPHER_ALGO, process.env.ENCRYPTION_KEY, iv);
    let cipherText = cipherIv.update(plainText, 'utf-8', 'hex');
    cipherText += cipherIv.final('hex');
    return `${iv}:${cipherText}`;
}
function globalDecryption(cipherText) {
    const [iv, cipher] = cipherText.split(':');
    const decipher = node_crypto_1.default.createDecipheriv(process.env.CIPHER_ALGO, process.env.ENCRYPTION_KEY, iv);
    let plainText = decipher.update(cipher, 'hex', 'utf-8');
    plainText += decipher.final('utf-8');
    return plainText;
}
//# sourceMappingURL=encypt.js.map