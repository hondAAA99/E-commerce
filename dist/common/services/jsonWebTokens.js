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
const redis_base_enum_1 = __importDefault(require("../enum/redis.base.enum"));
const token_enum_1 = require("../enum/token.enum");
let jwtServices = class jwtServices {
    JWTService;
    redisServices;
    userRepo;
    constructor() { }
    async generateToken({ payload, options, }) {
        return await this.JWTService.signAsync(payload, options);
    }
    verifyToken({ token, options, }) {
        return this.JWTService.verify(token, options);
    }
    async authenticateUtilts(authorization, tokenType) {
        let [prefix, token] = authorization.split(' ');
        if (!prefix || !token) {
            throw new common_1.BadRequestException('invalid token*1');
        }
        const { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } = this.getSecret(prefix);
        const verify = this.verifyToken({
            token: token,
            options: {
                secret: tokenType == token_enum_1.TokenTypeEnum.access_token
                    ? SECRET_ACCESS_TOKEN
                    : SECRET_REFRESH_TOKEN,
            },
        });
        if (!verify?.userId)
            throw new common_1.BadRequestException('invalidToken');
        const { user, decoded } = await this.decodedAndUserData(verify, token);
        return { user, decoded };
    }
    async decodedAndUserData(verify, token) {
        const user = await this.userRepo.findById({
            id: verify.userId,
        });
        if (!user)
            throw new common_1.BadRequestException('user does not exists');
        if (user.credentials &&
            user.credentials.getTime() < verify.iat * 1000) {
            console.log({ 1: user.credentials, 2: user.credentials.getTime() });
            throw new common_1.BadRequestException('token revoked please login again');
        }
        const CachedRevokeToken = await this.redisServices.getKey({
            key: this.redisServices.cacheKey({
                filter: token,
                subject: redis_base_enum_1.default.revokeToken,
            }),
        });
        if (CachedRevokeToken)
            throw new common_1.BadRequestException('token revoked please login again');
        return { user, decoded: verify };
    }
    getSecret(prefix) {
        if (!prefix)
            throw new common_1.BadRequestException('invalid token');
        let SECRET_ACCESS_TOKEN = '';
        let SECRET_REFRESH_TOKEN = '';
        if (prefix == process.env.TOKEN_USER_PREFIX) {
            SECRET_ACCESS_TOKEN = process.env.SECRET_USER_ACCESS_TOKEN;
            SECRET_REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN;
        }
        else if (prefix == process.env.TOKEN_ADMIN_PREFIX) {
            SECRET_ACCESS_TOKEN = process.env.SECRET_ADMIN_ACCESS_TOKEN;
            SECRET_REFRESH_TOKEN = process.env.SECRET_ADMIN_REFRESH_TOKEN;
        }
        else
            throw new common_1.BadRequestException('invalid token*2');
        return { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN };
    }
};
jwtServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], jwtServices);
exports.default = jwtServices;
//# sourceMappingURL=jsonWebTokens.js.map