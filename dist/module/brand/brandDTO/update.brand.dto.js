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
exports.ParamsidDto = exports.updateBrandDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createBrand_dto_1 = __importDefault(require("./createBrand.dto"));
const validation_decorators_1 = require("../../../common/decorators/validation.decorators");
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
let updateBrandDto = class updateBrandDto extends (0, mapped_types_1.PartialType)(createBrand_dto_1.default) {
};
exports.updateBrandDto = updateBrandDto;
exports.updateBrandDto = updateBrandDto = __decorate([
    (0, validation_decorators_1.isExists)(['name', 'slogan'])
], updateBrandDto);
class ParamsidDto {
    brandId;
}
exports.ParamsidDto = ParamsidDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], ParamsidDto.prototype, "brandId", void 0);
//# sourceMappingURL=update.brand.dto.js.map