"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_controller_1 = __importDefault(require("./user.controller"));
const user_service_1 = __importDefault(require("./user.service"));
const user_repo_1 = __importDefault(require("../../DataBase/repos/user.repo"));
const user_model_1 = require("../../DataBase/models/user/user.model");
const redis_services_1 = __importDefault(require("../../common/services/redis.services"));
const redis_module_1 = __importDefault(require("../../common/redis/redis.module"));
const jsonWebTokens_1 = __importDefault(require("../../common/utils/security/jsonWebTokens"));
const jwt_1 = require("@nestjs/jwt");
let userModule = class userModule {
};
userModule = __decorate([
    (0, common_1.Module)({
        imports: [user_model_1.userDataBaseModule, redis_module_1.default],
        controllers: [user_controller_1.default],
        providers: [user_service_1.default, user_repo_1.default, redis_services_1.default, jsonWebTokens_1.default, jwt_1.JwtService],
    })
], userModule);
exports.default = userModule;
//# sourceMappingURL=user.module.js.map