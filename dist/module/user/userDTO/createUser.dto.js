"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpDTO = void 0;
const class_validator_1 = require("class-validator");
const validation_decorators_1 = require("../../../common/decorators/validation.decorators");
const user_enum_1 = require("../../../common/enum/user.enum");
class signUpDTO {
    userName;
    email;
    password;
    cPassword;
    age;
    phone;
    gender;
    role;
    address;
}
exports.signUpDTO = signUpDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'name should not be empty' }),
    (0, class_validator_1.IsString)({ message: 'name must be of type string' }),
    __metadata("design:type", String)
], signUpDTO.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'email should not be empty' }),
    (0, class_validator_1.IsEmail)({}, { message: 'wrong email formation' }),
    __metadata("design:type", String)
], signUpDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'password should not be empty' }),
    (0, class_validator_1.IsString)({ message: 'password must be of type string' }),
    __metadata("design:type", String)
], signUpDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => {
        return Boolean(value.password);
    }),
    (0, validation_decorators_1.IsMatch)(['password']),
    __metadata("design:type", String)
], signUpDTO.prototype, "cPassword", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], signUpDTO.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'phone must be of type string' }),
    __metadata("design:type", String)
], signUpDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'gender must be of type string' }),
    (0, class_validator_1.IsEnum)(user_enum_1.genderEnum),
    __metadata("design:type", String)
], signUpDTO.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'role must be user or admin' }),
    (0, class_validator_1.IsEnum)(user_enum_1.roleEnum),
    __metadata("design:type", String)
], signUpDTO.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'address must be of type string' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], signUpDTO.prototype, "address", void 0);
//# sourceMappingURL=createUser.dto.js.map