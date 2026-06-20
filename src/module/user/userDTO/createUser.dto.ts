import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { IsMatch } from '../../../common/decorators/validation.decorators';
import { genderEnum, roleEnum } from '../../../common/enum/user.enum';

export class signUpDTO {
  @IsNotEmpty({ message: 'name should not be empty' })
  @IsString({ message: 'name must be of type string' })
  userName: string;

  @IsNotEmpty({ message: 'email should not be empty' })
  @IsEmail({}, { message: 'wrong email formation' })
  email: string;

  @IsNotEmpty({ message: 'password should not be empty' })
  @IsString({ message: 'password must be of type string' })
  password: string;

  @ValidateIf((value: signUpDTO) => {
    return Boolean(value.password);
  })
  @IsMatch(['password'])
  cPassword: string;

  @IsInt()
  @IsOptional()
  age: number;

  @IsOptional()
  @IsString({ message: 'phone must be of type string' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'gender must be of type string' })
  @IsEnum(genderEnum)
  gender: string;

  @IsOptional()
  @IsString({ message: 'role must be user or admin' })
  @IsEnum(roleEnum)
  role: string;

  @IsString({ message: 'address must be of type string' })
  @IsOptional()
  address: string;
}
