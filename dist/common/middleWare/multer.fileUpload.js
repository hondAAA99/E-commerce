"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = fileUpload;
const multer_1 = __importDefault(require("multer"));
const multer_base_enum_1 = require("../enum/multer.base.enum");
const node_os_1 = require("node:os");
function fileUpload({ fileType, storageType = multer_base_enum_1.multerStorageEnum.memory, }) {
    const storage = storageType == multer_base_enum_1.multerStorageEnum.memory
        ? multer_1.default.memoryStorage()
        : multer_1.default.diskStorage({
            destination: (0, node_os_1.tmpdir)(),
            filename: (req, file, cb) => {
                const prefix = Math.random();
                cb(null, prefix);
            },
        });
    return {
        storage,
        fileFilter: function fileFilter(req, file, cb) {
            if (fileType.includes(file.mimetype))
                cb(null, true);
            cb(null, false);
        },
    };
}
//# sourceMappingURL=multer.fileUpload.js.map