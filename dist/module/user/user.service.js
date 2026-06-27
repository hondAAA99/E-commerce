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
const hash_1 = require("../../common/utils/security/hash");
const redis_services_1 = __importDefault(require("../../common/services/redis.services"));
const jsonWebTokens_1 = __importDefault(require("../../common/utils/security/jsonWebTokens"));
const user_enum_1 = require("../../common/enum/user.enum");
const node_crypto_1 = __importDefault(require("node:crypto"));
let userServices = class userServices {
    _userModel;
    _redis;
    jwtServices;
    constructor(_userModel, _redis, jwtServices) {
        this._userModel = _userModel;
        this._redis = _redis;
        this.jwtServices = jwtServices;
    }
    signUp = async (body) => {
        const { password, email, userName, address, age, gender, role, phone } = body;
        const user = await this._userModel.create({
            userName,
            email,
            password,
            address,
            age,
            gender,
            role,
            phone,
        });
        return user;
    };
    logIn = async (body) => {
        const { email, password } = body;
        const user = await this._userModel.findOne({ filter: { email } });
        if (!user)
            throw new common_1.HttpException('user not found', 305);
        console.log(user);
        if (!(0, hash_1.globalCompare)(password, user?.password))
            throw new common_1.HttpException('incorrect password', 305);
        const accessToken = await this.jwtServices.generateToken({
            payload: { userId: user.id, userRole: user.role },
            options: {
                secret: user.role == user_enum_1.roleEnum.user
                    ? process.env.SECRET_USER_ACCESS_TOKEN
                    : process.env.SECRET_USER_ACCESS_TOKEN,
                expiresIn: '1day',
                jwtid: node_crypto_1.default.randomUUID(),
            },
        });
        const refreshToken = await this.jwtServices.generateToken({
            payload: { userId: user.id, userRole: user.role },
            options: {
                secret: user.role == user_enum_1.roleEnum.user
                    ? process.env.SECRET_USER_REFRESH_TOKEN
                    : process.env.SECRET_USER_REFRESH_TOKEN,
                expiresIn: '1day',
                jwtid: node_crypto_1.default.randomUUID(),
            },
        });
        return { accessToken, refreshToken };
    };
};
userServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repo_1.default,
        redis_services_1.default,
        jsonWebTokens_1.default])
], userServices);
exports.default = userServices;
//# sourceMappingURL=user.service.js.map