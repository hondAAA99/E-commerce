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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_repo_1 = __importDefault(require("../../DataBase/repos/user.repo"));
const s3Services_1 = __importDefault(require("../../common/services/s3Services"));
const brand_repo_1 = __importDefault(require("../../DataBase/repos/brand.repo"));
const globalresponse_1 = require("../../common/globalresponse");
let brandServices = class brandServices {
    _brandModel;
    _userModel;
    s3Services;
    constructor(_brandModel, _userModel, s3Services) {
        this._brandModel = _brandModel;
        this._userModel = _userModel;
        this.s3Services = s3Services;
    }
    async createBrand(body, User, file) {
        const { BrandName, createdBy } = body;
        await this._brandModel
            .findOne({ filter: { BrandName } })
            .then((val) => {
            if (val) {
                return (0, globalresponse_1.Errorforbidden)('brand name already exists');
            }
        })
            .catch((err) => {
            (0, globalresponse_1.ErrorInternalServerError)('failed to search on the database');
        });
        const url = await this.s3Services
            .uploadFile({
            file,
            path: `/brands-logo/${BrandName}-${Math.floor(Math.random() * 1000)}`,
        })
            .catch((err) => {
            return (0, globalresponse_1.ErrorInternalServerError)('failed to upload logo');
        });
        const brand = await this._brandModel
            .create({
            BrandName,
            createdBy,
            logo: url,
        })
            .catch(async (err) => {
            await this.s3Services.deleteFile({
                Key: url,
            });
            return (0, globalresponse_1.ErrorInternalServerError)('failed to create brand');
        });
        return brand;
    }
    async updateBrand(brandId, body, user) {
        const { BrandName, slogan } = body;
        const brand = await this._brandModel
            .findOne({ filter: { id: brandId.brandId, createdBy: user.id } })
            .catch((err) => {
            throw (0, globalresponse_1.ErrorInternalServerError)('failed find the brand due to database error');
        });
        if (!brand) {
            return (0, globalresponse_1.ErrorBadRequest)('can not find brand name');
        }
        if (BrandName && BrandName === brand.BrandName) {
            return (0, globalresponse_1.ErrorBadRequest)('cannot edit the brand name to the same name');
        }
        if (slogan && slogan === brand.slogan) {
            return (0, globalresponse_1.ErrorBadRequest)('cannot edit the brand slogan to the same slogan');
        }
        const brandUpdate = await this._brandModel.findByIdAndUpdate({
            id: brandId.brandId,
            update: {
                ...(BrandName ? { BrandName } : undefined),
                ...(slogan ? { slogan } : undefined),
            },
        });
        return brandUpdate;
    }
};
brandServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [brand_repo_1.default,
        user_repo_1.default,
        s3Services_1.default])
], brandServices);
exports.default = brandServices;
//# sourceMappingURL=brand.service.js.map