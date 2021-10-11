import { ValidationArguments } from 'class-validator';
import { getCpf } from 'json-generator';
import { IsValidCPFConstraint } from '../../../../src/presentation/validator/is.valid.cpf';

describe('IsValidCPFConstraint', () => {
  let validator: IsValidCPFConstraint;

  beforeAll(() => {
    validator = new IsValidCPFConstraint();
  });

  describe('validate()', () => {
    describe('when validate is successful', () => {
      it('should return true', () => {
        const result = validator.validate(getCpf(true));
        expect(result).toEqual(true);
      });
    });

    describe('when validate fails', () => {
      it('should return false', () => {
        const result = validator.validate('123.456.789.10');
        expect(result).toEqual(false);
      });
    });
  });

  describe('defaultMessage()', () => {
    it('should return the default message', () => {
      const result = validator.defaultMessage({
        property: 'cpf',
      } as ValidationArguments);
      expect(result).toBe(
        'cpf must comply with the Receita Federal rules for CPF',
      );
    });
  });
});
