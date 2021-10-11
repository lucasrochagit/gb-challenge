import { AlphaValidatorUtil } from '../../../../../src/presentation/validator/util/alpha.validator.util';

describe('AlphaValidatorUtil', () => {
  describe('isAlphaWithSpaces()', () => {
    describe('when validate if string is alpha with spaces', () => {
      it('should return true', () => {
        const result = AlphaValidatorUtil.isAlphaWithSpaces('Hello API');
        expect(result).toEqual(true);
      });
    });

    describe('when string is not alpha with spaces', () => {
      it('should return false', () => {
        const result = AlphaValidatorUtil.isAlphaWithSpaces('H3ll0 4P1');
        expect(result).toEqual(false);
      });
    });

    describe('when string is empty', () => {
      it('should return false', () => {
        const result = AlphaValidatorUtil.isAlphaWithSpaces('');
        expect(result).toEqual(false);
      });
    });

    describe('when string is null', () => {
      it('should return false', () => {
        const result = AlphaValidatorUtil.isAlphaWithSpaces(null);
        expect(result).toEqual(false);
      });
    });

    describe('when string is undefined', () => {
      it('should return false', () => {
        const result = AlphaValidatorUtil.isAlphaWithSpaces(undefined);
        expect(result).toEqual(false);
      });
    });
  });
});
