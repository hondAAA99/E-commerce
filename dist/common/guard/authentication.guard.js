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
const globalresponse_1 = require("../globalresponse");
const jsonWebTokens_1 = __importDefault(require("../services/jsonWebTokens"));
const core_1 = require("@nestjs/core");
const token_enum_1 = require("../enum/token.enum");
const Token_decorator_1 = require("../decorators/Token.decorator");
let authenticationGuard = class authenticationGuard {
    jwtServices;
    reflector;
    constructor(jwtServices, reflector) {
        this.jwtServices = jwtServices;
        this.reflector = reflector;
    }
    async canActivate(context) {
        let req;
        let authorization;
        let tokenType = this.reflector.get(Token_decorator_1.tokenTypeKey, context.getHandler()) ==
            token_enum_1.TokenTypeEnum.access_token
            ? token_enum_1.TokenTypeEnum.access_token
            : token_enum_1.TokenTypeEnum.refresh_token;
        if (context.getType() === 'http') {
            req = context.switchToHttp().getRequest();
            authorization = req.headers.authorization;
        }
        else if (context.getType() === 'rpc') {
        }
        else {
            req = context.switchToWs().getClient;
        }
        if (!authorization)
            throw new globalresponse_1.ErrorBadRequest('invalid token');
        try {
            const { user, decoded } = await this.jwtServices.authenticateUtilts(authorization, tokenType);
            req.user = user;
            req.decoded = decoded;
            return true;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('invalid signature');
        }
    }
};
authenticationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jsonWebTokens_1.default,
        core_1.Reflector])
], authenticationGuard);
exports.default = authenticationGuard;
//# sourceMappingURL=authentication.guard.js.map