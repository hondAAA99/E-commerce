import { HttpException, Injectable } from '@nestjs/common';
import { signUpDTO } from './userDTO/createUser.dto';
import userRepo from '../../DataBase/repos/user.repo';
import { globalCompare, globalHash } from '../../common/utils/security/hash';
import { HUDoc } from '../../DataBase/models/user/user.model';
import mongoose from 'mongoose';
import redisService from '../../common/services/redis.services';
import { signInDTO } from './userDTO/signInDTO';
import jwtServices from '../../common/services/jsonWebTokens';
import { roleEnum } from '../../common/enum/user.enum';
import crypto from 'node:crypto';
import s3services from '../../common/services/s3Services';

@Injectable()
class userServices {
  constructor(
    private readonly _userModel: userRepo,
    private readonly _redis: redisService,
    private readonly jwtServices: jwtServices,
    private readonly s3Services: s3services
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
    console.log(user);
    if (!globalCompare(password, user?.password))
      throw new HttpException('incorrect password', 305);

    const accessToken = await this.jwtServices.generateToken({
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

    const refreshToken = await this.jwtServices.generateToken({
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

  upload = async (file: Express.Multer.File) => {
    return this.s3Services.uploadFile({
      file,
      path: `photos`,
    });
  };

  uploadLargeFile = async (file: Express.Multer.File) => {
    return this.s3Services.uploadLargeFile({
      file,
      path: 'photos',
    });
  };

  // uploadLageFiles = async (files: Express.Multer.File[]) => {
  //   return this.s3Services.uploadFiles({
  //     files,
  //     large: files.map((file) => {
  //       return file.size > 5 * 5 * 1024 * 1024;
  //     }),
  //   });
  // };
}

export default userServices;
