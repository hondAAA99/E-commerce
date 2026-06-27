"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errorforbidden = Errorforbidden;
exports.ErrorInternalServerError = ErrorInternalServerError;
exports.ErrorBadRequest = ErrorBadRequest;
const common_1 = require("@nestjs/common");
function Errorforbidden(message) {
    throw new common_1.ForbiddenException(message);
}
function ErrorInternalServerError(message) {
    throw new common_1.InternalServerErrorException(message);
}
function ErrorBadRequest(message) {
    throw new common_1.BadRequestException(message);
}
//# sourceMappingURL=globalresponse.js.map