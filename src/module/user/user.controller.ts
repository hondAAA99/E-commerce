import {
  Body,
  Controller,
  Get,
  Post,
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

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor(
      'attachment',
      fileUpload({ fileType: multerFileEnum.image })
    )
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this._userServices.upload;
  }

  @Post('/upload-large-file')
  @UseInterceptors(
    FileInterceptor(
      'attachment',
      fileUpload({
        fileType: multerFileEnum.image,
        storageType: multerStorageEnum.disk,
      })
    )
  )
  uploadLageFile(@UploadedFile() file: Express.Multer.File) {
    return this._userServices.uploadLargeFile;
  }

  // @Post('/upload-large-files')
  // @UseInterceptors(
  //   FilesInterceptor(
  //     'attachments',
  //     2,
  //     fileUpload({ fileType: multerFileEnum.image })
  //   )
  // )
  // uploadLageFiles(@UploadedFiles() file: Express.Multer.File[]) {
  //   return this._userServices;
  // }
}

export default userController;
