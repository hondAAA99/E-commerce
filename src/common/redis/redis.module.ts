import { Global, HttpException, Module } from '@nestjs/common';

import redis from 'redis';
import redisService from '../services/redis.services';

@Global()
@Module({
  imports: [redisService],
  controllers: [],
  providers: [
    redisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = redis.createClient({
          url: process.env.REDIS_URI,
        });

        await client.connect();

        client.on('connect', () => {
          console.log('connect to redis');
        });

        client.on('error', (err) => {
          throw new HttpException(err, 500);
        });

        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export default class redisModule {}
