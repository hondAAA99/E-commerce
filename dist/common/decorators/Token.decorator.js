"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDecorators = exports.Roles = exports.rolesKey = exports.TokenType = exports.tokenTypeKey = void 0;
const common_1 = require("@nestjs/common");
const token_enum_1 = require("../enum/token.enum");
const user_enum_1 = require("../enum/user.enum");
const authentication_guard_1 = __importDefault(require("../guard/authentication.guard"));
const authorization_guard_1 = __importDefault(require("../guard/authorization.guard"));
exports.tokenTypeKey = 'tokenTypeKey';
const TokenType = (tokenType) => {
    return (0, common_1.SetMetadata)('tokenType', tokenType);
};
exports.TokenType = TokenType;
exports.rolesKey = 'rolesKey';
const Roles = (roles = [user_enum_1.roleEnum.user]) => {
    return (0, common_1.SetMetadata)(exports.rolesKey, roles);
};
exports.Roles = Roles;
const AuthDecorators = ({ accessRole = [user_enum_1.roleEnum.user], tokenType = token_enum_1.TokenTypeEnum.access_token, }) => {
    return (0, common_1.applyDecorators)((0, exports.TokenType)(tokenType), (0, exports.Roles)(accessRole), (0, common_1.UseGuards)(authentication_guard_1.default, authorization_guard_1.default));
};
exports.AuthDecorators = AuthDecorators;
//# sourceMappingURL=Token.decorator.js.map