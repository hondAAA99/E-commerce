import { RedisArgument, type RedisClientType } from 'redis';
import { Schema } from 'mongoose';
declare class redisService {
    private readonly _client;
    constructor(_client: RedisClientType);
    private keyExists;
    cacheKey({ filter, subject, }: {
        filter: string | Schema.Types.ObjectId;
        subject: string;
    }): string;
    setKey({ key, value, ttl, }: {
        key: RedisArgument;
        value: RedisArgument;
        ttl: number;
    }): Promise<string | null>;
    getKey({ key }: {
        key: string;
    }): Promise<void | string>;
    getAllKeys(pattern: RedisArgument): Promise<String[]>;
    deleteKey({ key }: {
        key: RedisArgument;
    }): Promise<number | undefined>;
    getKeyTtl(key: RedisArgument): Promise<number>;
    incrKey(key: RedisArgument): Promise<void>;
    addSet({ filter, subject }: {
        filter: string;
        subject: string;
    }, members: any): Promise<number>;
    getSet({ filter, subject }: {
        filter: string;
        subject: string;
    }): Promise<string[]>;
    deleteSet({ filter, subject }: {
        filter: string;
        subject: string;
    }, members: any): Promise<number>;
    existsSet({ filter, subject }: {
        filter: string;
        subject: string;
    }): Promise<number>;
}
export default redisService;
