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
const mongoose_1 = __importDefault(require("mongoose"));
const repo_base_js_1 = __importDefault(require("./repo.base.js"));
const mongoose_2 = require("@nestjs/mongoose");
const user_model_js_1 = require("../models/user/user.model.js");
const common_1 = require("@nestjs/common");
let userRepo = class userRepo extends repo_base_js_1.default {
    _model;
    constructor(_model = mongoose_1.default.models.users) {
        super(_model);
        this._model = _model;
    }
    userExists = async (email, checkFor) => {
        const userExists = await this.findOne({ filter: { email } });
        console.log(userExists);
        if (checkFor == 'exists') {
            if (userExists)
                throw new common_1.HttpException('email is not exists', 400);
        }
        else if (checkFor == 'notExists') {
            if (!userExists)
                throw new common_1.HttpException('email is already exists', 400);
        }
        return userExists;
    };
};
userRepo = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_model_js_1.User.name)),
    __metadata("design:paramtypes", [Object])
], userRepo);
exports.default = userRepo;
//# sourceMappingURL=user.repo.js.map