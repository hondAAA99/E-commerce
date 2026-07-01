"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const brand_service_1 = __importDefault(require("./brand.service"));
const platform_express_1 = require("@nestjs/platform-express");
const multer_fileUpload_1 = require("../../common/middleWare/multer.fileUpload");
const multer_base_enum_1 = require("../../common/enum/multer.base.enum");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const createBrand_dto_1 = __importDefault(require("./brandDTO/createBrand.dto"));
const Token_decorator_1 = require("../../common/decorators/Token.decorator");
const user_enum_1 = require("../../common/enum/user.enum");
const update_brand_dto_1 = require("./brandDTO/update.brand.dto");
let brandController = class brandController {
    _brandServices;
    constructor(_brandServices) {
        this._brandServices = _brandServices;
    }
    createBrand(file, user, body) {
        return this._brandServices.createBrand(body, user, file);
    }
    updateBrand(brandId, user, body) {
        return this._brandServices.updateBrand(brandId, body, user);
    }
};
__decorate([
    (0, common_1.Post)('/create-brand'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('attachment', (0, multer_fileUpload_1.fileUpload)({ fileType: multer_base_enum_1.multerFileEnum.image }))),
    (0, Token_decorator_1.AuthDecorators)({
        accessRole: [user_enum_1.roleEnum.admin],
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, createBrand_dto_1.default]),
    __metadata("design:returntype", void 0)
], brandController.prototype, "createBrand", null);
__decorate([
    (0, common_1.Put)('/create-brand'),
    (0, Token_decorator_1.AuthDecorators)({
        accessRole: [user_enum_1.roleEnum.admin],
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_brand_dto_1.ParamsidDto, Object, update_brand_dto_1.updateBrandDto]),
    __metadata("design:returntype", void 0)
], brandController.prototype, "updateBrand", null);
brandController = __decorate([
    (0, common_1.Controller)('/brand'),
    __metadata("design:paramtypes", [brand_service_1.default])
], brandController);
exports.default = brandController;
//# sourceMappingURL=brand.controller.js.map