import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class signInDTO {

  @IsNotEmpty({ message: 'email should not be empty' })
  @IsEmail({}, { message: 'wrong email formation' })
  email: string;

  @IsNotEmpty({ message: 'password should not be empty' })
  @IsString({ message: 'password must be of type string' })
  password: string;

}
