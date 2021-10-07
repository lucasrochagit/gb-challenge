import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

type Options = { withMask: boolean };
@ValidatorConstraint({ async: true })
export class IsValidCPFConstraint implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    return this.isValidCPF(cpf);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must comply with the Receita Federal rules for CPF`;
  }

  isValidCPF(cpf: string): boolean {
    const only_numbers: string = cpf.replace(/\D+/g, '');

    if (only_numbers.length !== 11) {
      return false;
    }

    const [a, b, c, d, e, f, g, h, i, j, k]: number[] = [...only_numbers].map(
      function (num) {
        return parseInt(num, 10);
      },
    );

    const mod_j: number =
      (a * 10 + b * 9 + c * 8 + d * 7 + e * 6 + f * 5 + g * 4 + h * 3 + i * 2) %
      11;
    const expect_j: number = mod_j < 2 ? 0 : 11 - mod_j;
    const mod_k: number =
      (a * 11 +
        b * 10 +
        c * 9 +
        d * 8 +
        e * 7 +
        f * 6 +
        g * 5 +
        h * 4 +
        i * 3 +
        expect_j * 2) %
      11;
    const expect_k: number = mod_k < 2 ? 0 : 11 - mod_k;

    return expect_j === j && expect_k === k;
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