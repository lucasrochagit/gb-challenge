import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AlphaValidatorUtil } from './util/alpha.validator.util';

@ValidatorConstraint({ async: true })
export class IsAlphaWithSpacesConstraint
  implements ValidatorConstraintInterface
{
  validate(str: string): boolean {
    return AlphaValidatorUtil.isAlphaWithSpaces(str);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must contains letters and a single space between words`;
  }

}

export function IsAlphaWithSpaces(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAlphaWithSpacesConstraint,
    });
  };
}
