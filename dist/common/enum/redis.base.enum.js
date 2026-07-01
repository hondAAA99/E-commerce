"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cacheKeyEnum = {
    revokeToken: 'revokeToken',
    emailAttempts: 'attempts',
    block: 'block',
    fcm: 'FCM',
    socket: 'socket',
    story: 'story',
    confirmSingUp: 'confirm::sign-up::otp',
    confirmLoginIn: 'confirm::log-in::otp',
    forgetPassword: 'forget::otp',
    twoStepVerification: 'enable-two-step-verification',
};
exports.default = cacheKeyEnum;
//# sourceMappingURL=redis.base.enum.js.map