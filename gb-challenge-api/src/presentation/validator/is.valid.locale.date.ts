import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DateValidatorUtil } from './util/date.validator.util';

@ValidatorConstraint({ async: true })
export class IsValidLocaleDateConstraint
  implements ValidatorConstraintInterface
{
  validate(date: string): boolean {
    return DateValidatorUtil.isValidLocaleDate(date);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be a valid locale date`;
  }
}

export function IsValidLocaleDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidLocaleDateConstraint,
    });
  };
}
