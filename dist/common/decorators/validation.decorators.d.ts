import { ValidationOptions } from 'class-validator';
export declare function IsMatch(constraints: string[], validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export declare function isExists(fields: string[], options?: ValidationOptions): (constructor: Function) => void;
