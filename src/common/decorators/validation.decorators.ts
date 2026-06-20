import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

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
