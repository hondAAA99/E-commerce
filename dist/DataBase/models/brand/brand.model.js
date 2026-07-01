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
exports.BrandDataBaseModule = exports.BrandSchema = exports.Brand = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
let Brand = class Brand {
    BrandName;
    logo;
    createdBy;
    createdAt;
    slug;
    slogan;
    updatedAt;
    deletedAt;
    deletedBy;
};
exports.Brand = Brand;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true, unique: true }),
    __metadata("design:type", String)
], Brand.prototype, "BrandName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Brand.prototype, "logo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Brand.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Brand.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: function () {
            return (0, slugify_1.default)(this.BrandName, {
                replacement: '-',
                trim: true,
                lower: true,
            });
        },
    }),
    __metadata("design:type", String)
], Brand.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Brand.prototype, "slogan", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Brand.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Brand.prototype, "deletedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Brand.prototype, "deletedBy", void 0);
exports.Brand = Brand = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        strict: true,
        strictQuery: true,
    })
], Brand);
exports.BrandSchema = mongoose_1.SchemaFactory.createForClass(Brand);
exports.BrandDataBaseModule = mongoose_1.MongooseModule.forFeature([
    { name: Brand.name, schema: exports.BrandSchema },
]);
//# sourceMappingURL=brand.model.js.map