import { Module } from '@nestjs/common';
import categoryController from './category.controller';
import categoryServices from './category.service';
import categoryRepo from '../../DataBase/repos/category.repo';
import jwtServices from '../../common/services/jsonWebTokens';
import userRepo from '../../DataBase/repos/user.repo';
import redisService from '../../common/services/redis.services';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [categoryController],
  exports: [],
  imports: [],
  providers: [
    categoryServices,
    categoryRepo,
    jwtServices,
    userRepo,
    redisService,
    JwtService,
  ],
})
class categoryModule {}

export default categoryModule;
