import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'matchKey' })
class matchKey implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments
  ): Promise<boolean> | boolean {
    return (
      validationArguments?.value ==
      validationArguments?.object[validationArguments.constraints[0] as string]
    );
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} do not match ${validationArguments?.object['password']}`;
  }
}

export function IsMatch(
  constraints: string[],
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints,
      validator: matchKey,
    });
  };
}

@ValidatorConstraint({ name: 'isExists', async: false })
class IsExistsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const fields = args.constraints[0] as string[];
    const object = args.object as Record<string, any>;
    return fields.some((field) => Boolean(object[field]));
  }

  defaultMessage(args: ValidationArguments): string {
    const fields = args.constraints[0] as string[];
    return `one of ${fields.join(', ')} must exist`;
  }
}

export function isExists(fields: string[], options?: ValidationOptions) {
  return function (constructor: Function) {
    registerDecorator({
      target: constructor,
      propertyName: '',
      options,
      constraints: [fields],
      validator: IsExistsConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'checkIds', async: true })
export class checkIds implements ValidatorConstraintInterface {
  validate(
    ids: string[],
    validationArguments?: ValidationArguments
  ): Promise<boolean> | boolean {
    return ids.map((id) => Types.ObjectId.isValid(id)).length != ids.length;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'failed to validate ids';
  }
}
