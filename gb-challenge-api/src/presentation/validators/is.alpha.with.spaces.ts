import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsAlphaWithSpacesConstraint
  implements ValidatorConstraintInterface
{
  validate(cpf: string, validationArguments?: ValidationArguments): boolean {
    return this.isAlphaWithSpaces(cpf);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must contains letters and a single space between words`;
  }

  isAlphaWithSpaces(cpf: string): boolean {
    return /^([A-ZÀ-Üa-zà-ü]+\s?)*(?<! )$/.test(cpf);
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
