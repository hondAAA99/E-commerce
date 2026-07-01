import { Prop } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

class confirmUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  otp: string;
}

export default confirmUserDto;
