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
const user_service_1 = __importDefault(require("./user.service"));
const createUser_dto_1 = require("./userDTO/createUser.dto");
const signInDTO_1 = require("./userDTO/signInDTO");
const token_enum_1 = require("../../common/enum/token.enum");
const Token_decorator_1 = require("../../common/decorators/Token.decorator");
const user_enum_1 = require("../../common/enum/user.enum");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const multer_fileUpload_1 = require("../../common/middleWare/multer.fileUpload");
const multer_base_enum_1 = require("../../common/enum/multer.base.enum");
let userController = class userController {
    _userServices;
    constructor(_userServices) {
        this._userServices = _userServices;
    }
    signUp(body) {
        return this._userServices.signUp(body);
    }
    signIn(body) {
        return this._userServices.logIn(body);
    }
    getUser(user) {
        return { user };
    }
    uploadFile(file) {
        return this._userServices.upload;
    }
    uploadLageFile(file) {
        return this._userServices.uploadLargeFile;
    }
};
__decorate([
    (0, common_1.Post)('/sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.signUpDTO]),
    __metadata("design:returntype", Object)
], userController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/sign-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signInDTO_1.signInDTO]),
    __metadata("design:returntype", void 0)
], userController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)('/getUser'),
    (0, Token_decorator_1.AuthDecorators)({
        accessRole: [user_enum_1.roleEnum.user],
        tokenType: token_enum_1.TokenTypeEnum.access_token,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], userController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('attachment', (0, multer_fileUpload_1.fileUpload)({ fileType: multer_base_enum_1.multerFileEnum.image }))),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], userController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('/upload-large-file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('attachment', (0, multer_fileUpload_1.fileUpload)({
        fileType: multer_base_enum_1.multerFileEnum.image,
        storageType: multer_base_enum_1.multerStorageEnum.disk,
    }))),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], userController.prototype, "uploadLageFile", null);
userController = __decorate([
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [user_service_1.default])
], userController);
exports.default = userController;
//# sourceMappingURL=user.controller.js.map