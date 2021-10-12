import { DateValidatorUtil } from '../../../../../src/presentation/validator/util/date.validator.util';

describe('DateValidatorUtil', () => {
  describe('isValidLocaleDate()', () => {
    describe('when validate if string is valid locale date', () => {
      it('should return true', () => {
        const result = DateValidatorUtil.isValidLocaleDate(
          new Date().toLocaleDateString(),
        );
        expect(result).toEqual(true);
      });
    });

    describe('when string is not a valid locale date', () => {
      it('should return false for invalid date format', () => {
        const result = DateValidatorUtil.isValidLocaleDate(
          new Date().toISOString(),
        );
        expect(result).toEqual(false);
      });

      it('should return false for invalid day', () => {
        const result = DateValidatorUtil.isValidLocaleDate('32/12/2021');
        expect(result).toEqual(false);
      });

      it('should return false for invalid day for february in common years', () => {
        const result = DateValidatorUtil.isValidLocaleDate('29/02/2021');
        expect(result).toEqual(false);
      });

      it('should return false for invalid day for february in leap years', () => {
        const result = DateValidatorUtil.isValidLocaleDate('30/02/2020');
        expect(result).toEqual(false);
      });

      it('should return false for invalid day for months that have only 30 days', () => {
        const result = DateValidatorUtil.isValidLocaleDate('31/04/2020');
        expect(result).toEqual(false);
      });
    });

    describe('when string is empty', () => {
      it('should return false', () => {
        const result = DateValidatorUtil.isValidLocaleDate('');
        expect(result).toEqual(false);
      });
    });

    describe('when string is null', () => {
      it('should return false', () => {
        const result = DateValidatorUtil.isValidLocaleDate(null);
        expect(result).toEqual(false);
      });
    });

    describe('when string is undefined', () => {
      it('should return false', () => {
        const result = DateValidatorUtil.isValidLocaleDate(undefined);
        expect(result).toEqual(false);
      });
    });
  });
});
