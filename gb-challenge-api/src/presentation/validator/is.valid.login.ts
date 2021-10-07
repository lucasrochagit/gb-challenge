import {
  isEmail,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { CPFValidatorUtil } from './util/cpf.validator.util';

@ValidatorConstraint({ async: true })
export class IsValidLoginConstraint implements ValidatorConstraintInterface {
  validate(login: string): boolean {
    return CPFValidatorUtil.isValidCPF(login) || isEmail(login);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be a valid CPF or a valid email`;
  }
}

export function IsValidLogin(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidLoginConstraint,
    });
  };
}
