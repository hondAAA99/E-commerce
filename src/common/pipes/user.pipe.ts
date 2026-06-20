// import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
// import createUserDTO from '../../module/user/userDTO/createUser.dto';
// import * as z from 'zod';

// @Injectable()
// class customValidation1 implements PipeTransform {
//   constructor(private schema: z.ZodType) {}
//   transform(value: createUserDTO): any {
//     const { success, error } = this.schema.safeParse(value);
//     if (!success) {
//       throw new HttpException(
//         {
//           message: 'validation error',
//           error: error.issues.map((issue) => {
//             return {
//               message: issue.message,
//               path: issue.path,
//             };
//           }),
//         },
//         400
//       );
//     }
//     return value;
//   }
// }

// export default customValidation1;
