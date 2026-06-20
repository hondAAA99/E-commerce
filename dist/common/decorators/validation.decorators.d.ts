import { ValidationOptions } from 'class-validator';
export declare function IsMatch(constraints: string[], validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
