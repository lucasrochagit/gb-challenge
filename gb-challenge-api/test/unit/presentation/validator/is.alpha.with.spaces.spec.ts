import { ValidationArguments } from 'class-validator';
import { IsAlphaWithSpacesConstraint } from '../../../../src/presentation/validator/is.alpha.with.spaces';

describe('IsAlphaWithSpacesConstraint', () => {
  let validator: IsAlphaWithSpacesConstraint;

  beforeAll(() => {
    validator = new IsAlphaWithSpacesConstraint();
  });

  describe('validate()', () => {
    describe('when validate is successful', () => {
      it('should return true', () => {
        const result = validator.validate('Hello API');
        expect(result).toEqual(true);
      });
    });

    describe('when validate fails', () => {
      it('should return false', () => {
        const result = validator.validate('H3ll0 4P1');
        expect(result).toEqual(false);
      });
    });
  });

  describe('defaultMessage()', () => {
    it('should return the default message', () => {
      const result = validator.defaultMessage({
        property: 'key',
      } as ValidationArguments);
      expect(result).toBe(
        'key must contains letters and a single space between words',
      );
    });
  });
});
