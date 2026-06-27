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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let redisService = class redisService {
    _client;
    constructor(_client) {
        this._client = _client;
    }
    async keyExists({ key }) {
        return await this._client.exists(key);
    }
    cacheKey({ filter, subject, }) {
        return `${subject}::${filter}`;
    }
    async setKey({ key, value, ttl = 60, }) {
        try {
            value =
                typeof value == String
                    ? value
                    : JSON.stringify(value, null, 2);
            return await this._client.set(key, value, { EX: ttl });
        }
        catch (err) {
            throw new common_1.HttpException(err, 400);
        }
    }
    async getKey({ key }) {
        try {
            const value = await this._client.get(key);
            try {
                return JSON.parse(value);
            }
            catch (err) {
                return value;
            }
        }
        catch (err) {
            throw new common_1.HttpException('failed to get the value from cache', 400);
        }
    }
    async getAllKeys(pattern) {
        try {
            const value = await this._client.keys(pattern);
            return value;
        }
        catch (err) {
            throw new common_1.HttpException(err, 400);
        }
    }
    async deleteKey({ key }) {
        try {
            if (!(await this.keyExists({ key })) > 0) {
                return;
            }
            const value = await this._client.del(await this.getAllKeys(key));
            return value;
        }
        catch (err) {
            throw new common_1.HttpException(err, 400);
        }
    }
    async getKeyTtl(key) {
        try {
            if (!this.keyExists({ key }) > 0) {
                throw new common_1.HttpException('key expiered', 400);
            }
            const value = await this._client.ttl(key);
            return value;
        }
        catch (err) {
            throw new common_1.HttpException(err, 400);
        }
    }
    async incrKey(key) {
        try {
            await this._client.incr(key);
        }
        catch (err) {
            throw new common_1.HttpException(err, 400);
        }
    }
    async addSet({ filter, subject }, members) {
        return await this._client.sAdd(this.cacheKey({
            filter,
            subject,
        }), members);
    }
    async getSet({ filter, subject }) {
        return await this._client.sMembers(this.cacheKey({
            filter,
            subject,
        }));
    }
    async deleteSet({ filter, subject }, members) {
        return await this._client.sRem(this.cacheKey({
            filter,
            subject,
        }), members);
    }
    async existsSet({ filter, subject }) {
        return await this._client.sCard(this.cacheKey({
            filter,
            subject,
        }));
    }
};
redisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [Object])
], redisService);
exports.default = redisService;
//# sourceMappingURL=redis.services.js.map