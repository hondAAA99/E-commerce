import { PartialType } from '@nestjs/mapped-types';
import { signUpDTO } from './createUser.dto';

class updateUserDTO extends PartialType(signUpDTO){}


export default updateUserDTO