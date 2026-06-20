import redis, { RedisArgument, type RedisClientType } from 'redis';
import { Schema } from 'mongoose';
import { HttpException, Inject, Injectable } from '@nestjs/common';


@Injectable()
class redisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly _client: RedisClientType
  ) {}

  private async keyExists({ key }: { key: RedisArgument }): Promise<number> {
    return await this._client.exists(key);
  }

  cacheKey({
    filter,
    subject,
  }: {
    filter: string | Schema.Types.ObjectId;
    subject: string;
  }): string {
    return `${subject}::${filter}`;
  }

  async setKey({
    key,
    value,
    ttl = 60,
  }: {
    key: RedisArgument;
    value: RedisArgument;
    ttl: number;
  }) {
    try {
      value =
        (typeof value as any) == String
          ? value
          : JSON.stringify(value, null, 2);
      return await this._client.set(key, value, { EX: ttl });
    } catch (err) {
      throw new HttpException(err as any, 400);
    }
  }

  async getKey({ key }: { key: string }): Promise<void | string> {
    try {
      const value = await this._client.get(key);
      try {
        return JSON.parse(value as string);
      } catch () {
        return value as string;
      }
    } catch (err) {
      throw new HttpException('failed to get the value from cache', 400);
    }
  }

  async getAllKeys(pattern: RedisArgument): Promise<String[]> {
    try {
      const value = await this._client.keys(pattern);
      return value;
    } catch (err) {
      throw new HttpException(err as any, 400);
    }
  }

  async deleteKey({ key }: { key: RedisArgument }) {
    try {
      if ((!(await this.keyExists({ key })) as unknown as number) > 0) {
        return;
      }
      const value = await this._client.del(await this.getAllKeys(key) as any);
      return value;
    } catch (err) {
      throw new HttpException(err as any, 400);
    }
  }

  async getKeyTtl(key: RedisArgument) {
    try {
      if ((!this.keyExists({ key }) as unknown as number) > 0) {
        throw new HttpException('key expiered', 400);
      }
      const value = await this._client.ttl(key);
      return value;
    } catch (err) {
      throw new HttpException(err as any, 400);
    }
  }

  async incrKey(key: RedisArgument) {
    try {
      await this._client.incr(key);
    } catch (err) {
      throw new HttpException(err as any, 400);
    }
  }

  async addSet(
    { filter, subject }: { filter: string; subject: string },
    members: any
  ): Promise<number> {
    return await this._client.sAdd(
      this.cacheKey({
        filter,
        subject,
      }),
      members
    );
  }

  async getSet({ filter, subject }: { filter: string; subject: string }) {
    return await this._client.sMembers(
      this.cacheKey({
        filter,
        subject,
      })
    );
  }

  async deleteSet(
    { filter, subject }: { filter: string; subject: string },
    members: any
  ) {
    return await this._client.sRem(
      this.cacheKey({
        filter,
        subject,
      }),
      members
    );
  }

  async existsSet({ filter, subject }: { filter: string; subject: string }) {
    return await this._client.sCard(
      this.cacheKey({
        filter,
        subject,
      })
    );
  }
}

export default redisService;
