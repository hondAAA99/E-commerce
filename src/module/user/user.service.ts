import { HttpException, Injectable } from '@nestjs/common';
import { signUpDTO } from './userDTO/createUser.dto';
import userRepo from '../../DataBase/repos/user.repo';
import { globalCompare, globalHash } from '../../common/utils/security/hash';
import { HUDoc } from '../../DataBase/models/user/user.model';
import mongoose from 'mongoose';
import redisService from '../../common/services/redis.services';
import { signInDTO } from './userDTO/signInDTO';
import jwtServices from '../../common/utils/security/jsonWebTokens';
import { roleEnum } from '../../common/enum/user.enum';
import crypto from 'node:crypto';

@Injectable()
class userServices {
  constructor(
    private readonly _userModel: userRepo,
    private readonly _redis: redisService,
    private readonly jwtServices: jwtServices
  ) {}

  signUp = async (body: signUpDTO): Promise<HUDoc> => {
    const { password, email, userName, address, age, gender, role, phone } =
      body;

    const user = await this._userModel.create({
      userName,
      email,
      password,
      address,
      age,
      gender,
      role,
      phone,
    });

    return user;
  };

  logIn = async (body: signInDTO) => {
    const { email, password } = body;
    const user = await this._userModel.findOne({ filter: { email } });
    if (!user) throw new HttpException('user not found', 305);

    if (!globalCompare(password, user?.password))
      throw new HttpException('incorrect password', 305);

    const accessToken = this.jwtServices.generateToken({
      payload: { userId: user.id, userRole: user.role },
      options: {
        secret:
          user.role == roleEnum.user
            ? process.env.SECRET_USER_ACCESS_TOKEN
            : process.env.SECRET_USER_ACCESS_TOKEN,

        expiresIn: '1day',
        jwtid: crypto.randomUUID(),
      },
    });

    const refreshToken = this.jwtServices.generateToken({
      payload: { userId: user.id, userRole: user.role },
      options: {
        secret:
          user.role == roleEnum.user
            ? process.env.SECRET_USER_REFRESH_TOKEN
            : process.env.SECRET_USER_REFRESH_TOKEN,

        expiresIn: '1day',
        jwtid: crypto.randomUUID(),
      },
    });

    return { accessToken, refreshToken };
  };
}

export default userServices;
