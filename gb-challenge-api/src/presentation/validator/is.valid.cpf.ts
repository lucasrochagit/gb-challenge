import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CPFValidatorUtil } from './util/cpf.validator.util';

@ValidatorConstraint({ async: true })
export class IsValidCPFConstraint implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    return CPFValidatorUtil.isValidCPF(cpf);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must comply with the Receita Federal rules for CPF`;
  }
}

export function IsValidCPF(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidCPFConstraint,
    });
  };
}
