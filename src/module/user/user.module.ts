import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import userController from './user.controller';
import userService from './user.service';
import userRepo from '../../DataBase/repos/user.repo';
import { userDataBaseModule } from '../../DataBase/models/user/user.model';
import redisService from '../../common/services/redis.services';
import redisModule from '../../common/redis/redis.module';
import jwtServices from '../../common/services/jsonWebTokens';
import { JwtService } from '@nestjs/jwt';
import s3services from '../../common/services/s3Services';

@Module({
  imports: [userDataBaseModule, redisModule],
  controllers: [userController],
  providers: [
    userService,
    userRepo,
    redisService,
    jwtServices,
    JwtService,
    s3services,
  ],
})
class userModule {}

export default userModule;
