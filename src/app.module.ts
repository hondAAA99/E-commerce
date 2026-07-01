import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import userModule from './module/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import redisModule from './common/redis/redis.module';
import brandModule from './module/brand/brand.module';
import categoryModule from './module/category/category.module';
import productModule from './module/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!, {
      onConnectionCreate: (connection) => {
        connection.on('connect', () => {
          console.log('connected to dataBase');
        });
        return connection;
      },
    }),
    userModule,
    redisModule,
    brandModule,
    categoryModule,
    productModule,
  ],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
