import mongoose from 'mongoose';
import repoBase from './repo.base.js';
import { InjectModel } from '@nestjs/mongoose';
import { HUDoc, User } from '../models/user/user.model.js';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
class userRepo extends repoBase<User> {
  constructor(
    @InjectModel(User.name)
    protected _model = mongoose.models.users
  ) {
    super(_model);
  }

  userExists = async (
    email: string,
    checkFor: string
  ): Promise<HUDoc | null> => {
    const userExists = await this.findOne({ filter: { email } });
    console.log(userExists);

    if (checkFor == 'exists') {
      if (userExists) throw new HttpException('email is not exists', 400);
    } else if (checkFor == 'notExists') {
      if (!userExists) throw new HttpException('email is already exists', 400);
    }

    return userExists;
  };
}

export default userRepo;
