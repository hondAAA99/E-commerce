import { Body, Controller, Post } from '@nestjs/common';
import userService from './user.service';
import { signUpDTO } from './userDTO/createUser.dto';
import { signInDTO } from './userDTO/signInDTO';
@Controller('/users')
class userController {
  constructor(private readonly _userServices: userService) {}

  @Post('/sign-up')
  signUp(@Body() body: signUpDTO): any {
    return this._userServices.signUp(body);
  }

  @Post('sign-in')
  signIn(@Body() body: signInDTO) {
    return this._userServices.logIn(body)
  }
}

export default userController;
