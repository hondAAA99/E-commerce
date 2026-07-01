import { Module } from '@nestjs/common';
import productController from './product.controller';
import productServices from './product.service';
import jwtServices from '../../common/services/jsonWebTokens';
import userRepo from '../../DataBase/repos/user.repo';
import redisService from '../../common/services/redis.services';
import { JwtService } from '@nestjs/jwt';
import redisModule from '../../common/redis/redis.module';
import s3services from '../../common/services/s3Services';

@Module({
  controllers: [productController],
  exports: [],
  imports: [redisModule],
  providers: [
    productServices,
    jwtServices,
    userRepo,
    redisService,
    JwtService,
    s3services,
  ],
})
class productModule {}
export default productModule;
