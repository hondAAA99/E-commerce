"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMatch = IsMatch;
exports.isExists = isExists;
const class_validator_1 = require("class-validator");
let matchKey = class matchKey {
    validate(value, validationArguments) {
        return (validationArguments?.value ==
            validationArguments?.object[validationArguments.constraints[0]]);
    }
    defaultMessage(validationArguments) {
        return `${validationArguments?.property} do not match ${validationArguments?.object['password']}`;
    }
};
matchKey = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'matchKey' })
], matchKey);
function IsMatch(constraints, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints,
            validator: matchKey,
        });
    };
}
let IsExistsConstraint = class IsExistsConstraint {
    validate(value, args) {
        const fields = args.constraints[0];
        const object = args.object;
        return fields.some((field) => Boolean(object[field]));
    }
    defaultMessage(args) {
        const fields = args.constraints[0];
        return `one of ${fields.join(', ')} must exist`;
    }
};
IsExistsConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isExists', async: false })
], IsExistsConstraint);
function isExists(fields, options) {
    return function (constructor) {
        (0, class_validator_1.registerDecorator)({
            target: constructor,
            propertyName: '',
            options,
            constraints: [fields],
            validator: IsExistsConstraint,
        });
    };
}
//# sourceMappingURL=validation.decorators.js.map