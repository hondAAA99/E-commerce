import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import userService from './user.service';
import { signUpDTO } from './userDTO/createUser.dto';
import { signInDTO } from './userDTO/signInDTO';
import { TokenTypeEnum } from '../../common/enum/token.enum';
import { AuthDecorators } from '../../common/decorators/Token.decorator';
import { roleEnum } from '../../common/enum/user.enum';
import { User } from '../../common/decorators/user.decorator';
import type { HUDoc } from '../../DataBase/models/user/user.model';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { Multer } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import { fileUpload } from '../../common/middleWare/multer.fileUpload';
import {
  multerFileEnum,
  multerStorageEnum,
} from '../../common/enum/multer.base.enum';
import confirmUserDto from './userDTO/cofirmUser';
@Controller('/users')
class userController {
  constructor(private readonly _userServices: userService) {}

  @Post('/sign-up')
  signUp(@Body() body: signUpDTO): any {
    return this._userServices.signUp(body);
  }

  @Post('/sign-in')
  signIn(@Body() body: signInDTO) {
    return this._userServices.logIn(body);
  }

  @Get('/getUser')
  @AuthDecorators({
    accessRole: [roleEnum.user],
    tokenType: TokenTypeEnum.access_token,
  })
  getUser(@User() user: HUDoc) {
    return { user };
  }

  @Post('/confirm-email')
  confirmUser(@Body() body: confirmUserDto) {
    return this._userServices.confirmEmail(body);
  }

  @Get('/re-send-otp/:flag')
  reSendOtp(@Param('flag') flag: string, @Body('email') email: string) {
    return this._userServices.reSendOtp(flag, email);
  }

  @Get('/access-token')
  @AuthDecorators({
    accessRole: [roleEnum.user, roleEnum.admin],
    tokenType: TokenTypeEnum.refresh_token,
  })
  reGenerateAccessToken(@User() user: HUDoc) {
    return this._userServices.reGenerateAccessToken(user);
  }

  @Post('/add-admin')
  @AuthDecorators({
    accessRole: [roleEnum.admin],
  })
  addAdmin(@Body() body: signUpDTO) {
    return this._userServices.addAdmin(body);
  }

  @Delete('/log-out')
  @AuthDecorators({
    accessRole: [roleEnum.user, roleEnum.admin],
    tokenType: TokenTypeEnum.refresh_token,
  })
  logout(@Param('flag') flag: string, @Req() req: any) {
    return this._userServices.logout(flag, req);
  }
}

export default userController;
