"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mail_enum_1 = __importDefault(require("../../enum/mail.enum"));
const email_event_1 = require("./email.event");
const nodeMailer_1 = require("./nodeMailer");
const redis_services_1 = __importDefault(require("../../services/redis.services"));
const hash_1 = require("../../utils/security/hash");
const redis_base_enum_1 = __importDefault(require("../../enum/redis.base.enum"));
const common_1 = require("@nestjs/common");
const sendEmail = async ({ to, subject, data, }) => {
    const redis = new redis_services_1.default(null);
    const blockedUserTtl = await redis.getKeyTtl(redis.cacheKey({
        filter: to,
        subject: redis_base_enum_1.default.block,
    }));
    const attemptsValue = await redis.getKey({
        key: redis.cacheKey({
            filter: to,
            subject: redis_base_enum_1.default.emailAttempts,
        }),
    });
    if (blockedUserTtl && blockedUserTtl > 0) {
        throw new common_1.HttpException(`you are being blocked please wait for ${blockedUserTtl}`, 400);
    }
    let attempts = attemptsValue ? parseInt(attemptsValue) : 0;
    if (!attemptsValue) {
        await redis.setKey({
            key: redis.cacheKey({
                filter: to,
                subject: redis_base_enum_1.default.emailAttempts,
            }),
            value: '0',
            ttl: 60 * 10,
        });
    }
    await redis.incrKey(redis.cacheKey({
        filter: to,
        subject: redis_base_enum_1.default.emailAttempts,
    }));
    attempts++;
    if (attempts > 5) {
        await redis.setKey({
            key: redis.cacheKey({
                filter: to,
                subject: redis_base_enum_1.default.block,
            }),
            value: '1',
            ttl: 60 * 10,
        });
        throw new common_1.HttpException('you are being blocked for 10min', 401);
    }
    email_event_1.eventEmitter.emit(mail_enum_1.default.sendMail, async () => {
        await Promise.all([
            redis.setKey({
                key: redis.cacheKey({ filter: to, subject }),
                value: (0, hash_1.globalHash)(`${data}`),
                ttl: 60 * 5,
            }),
            (0, nodeMailer_1.sendMail)({
                to,
                subject,
                data,
            }),
        ]);
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map