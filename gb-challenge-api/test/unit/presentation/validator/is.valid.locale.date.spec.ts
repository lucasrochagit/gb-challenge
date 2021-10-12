import { ValidationArguments } from 'class-validator';
import { IsValidLocaleDateConstraint } from '../../../../src/presentation/validator/is.valid.locale.date';

describe('IsValidLocaleDateConstraint', () => {
  let validator: IsValidLocaleDateConstraint;

  beforeAll(() => {
    validator = new IsValidLocaleDateConstraint();
  });

  describe('validate()', () => {
    describe('when validate is successful', () => {
      it('should return true', () => {
        const result = validator.validate(new Date().toLocaleDateString());
        expect(result).toEqual(true);
      });
    });

    describe('when validate fails', () => {
      it('should return false', () => {
        const result = validator.validate(new Date().toISOString());
        expect(result).toEqual(false);
      });
    });
  });

  describe('defaultMessage()', () => {
    it('should return the default message', () => {
      const result = validator.defaultMessage({
        property: 'date',
      } as ValidationArguments);
      expect(result).toBe('date must be a valid locale date');
    });
  });
});
