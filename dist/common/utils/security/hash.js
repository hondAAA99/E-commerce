"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalHash = globalHash;
exports.globalCompare = globalCompare;
const bcrypt_1 = __importDefault(require("bcrypt"));
function globalHash(plainText) {
    const salt = bcrypt_1.default.genSaltSync(8);
    return bcrypt_1.default.hashSync(plainText, salt);
}
function globalCompare(plainText, hashText) {
    return bcrypt_1.default.compareSync(plainText, hashText);
}
//# sourceMappingURL=hash.js.map