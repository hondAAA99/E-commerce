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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const Token_decorator_1 = require("../decorators/Token.decorator");
let authorizationGuard = class authorizationGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        let req;
        const roles = this.reflector.get(Token_decorator_1.rolesKey, context.getHandler);
        if (context.getType() === 'http') {
            req = context.switchToHttp().getRequest();
        }
        else if (context.getType() === 'rpc') {
        }
        else {
            req = context.switchToWs().getClient;
        }
        if (!roles.includes(req.user.role))
            throw new common_1.UnauthorizedException('you are not allowed to access this operation');
        return true;
    }
};
authorizationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], authorizationGuard);
exports.default = authorizationGuard;
//# sourceMappingURL=authorization.guard.js.map