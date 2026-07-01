import { Module } from '@nestjs/common';
import { BrandDataBaseModule } from '../../DataBase/models/brand/brand.model';
import { userDataBaseModule } from '../../DataBase/models/user/user.model';
import brandServices from './brand.service';
import brandController from './brand.controller';
import repoBase from '../../DataBase/repos/repo.base';
import brandRepo from '../../DataBase/repos/brand.repo';
import userRepo from '../../DataBase/repos/user.repo';
import redisService from '../../common/services/redis.services';
import { JwtService } from '@nestjs/jwt';
import jwtServices from '../../common/services/jsonWebTokens';
import s3services from '../../common/services/s3Services';
import redisModule from '../../common/redis/redis.module';

@Module({
  imports: [BrandDataBaseModule, userDataBaseModule, redisModule],
  controllers: [brandController],
  providers: [
    brandServices,
    brandRepo,
    userRepo,
    redisService,
    JwtService,
    jwtServices,
    s3services,
  ],
})
class brandModule {}

export default brandModule;
