import { ValidationArguments } from 'class-validator';
import { getCpf } from 'json-generator';
import { IsValidLoginConstraint } from '../../../../src/presentation/validator/is.valid.login';

describe('IsValidLoginConstraint', () => {
  let validator: IsValidLoginConstraint;

  beforeAll(() => {
    validator = new IsValidLoginConstraint();
  });

  describe('validate()', () => {
    describe('when validate is successful', () => {
      it('should return true for valid cpf', () => {
        const result = validator.validate(getCpf(true));
        expect(result).toEqual(true);
      });

      it('should return true for valid email', () => {
        const result = validator.validate('johndoe@mail.com');
        expect(result).toEqual(true);
      });
    });

    describe('when validate fails', () => {
      it('should return false', () => {
        const result = validator.validate('invalidLogin');
        expect(result).toEqual(false);
      });
    });
  });

  describe('defaultMessage()', () => {
    it('should return the default message', () => {
      const result = validator.defaultMessage({
        property: 'login',
      } as ValidationArguments);
      expect(result).toBe('login must be a valid CPF or a valid email');
    });
  });
});
