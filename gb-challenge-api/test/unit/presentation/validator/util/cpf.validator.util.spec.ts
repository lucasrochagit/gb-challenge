import { getCpf } from 'json-generator';
import { CPFValidatorUtil } from '../../../../../src/presentation/validator/util/cpf.validator.util';

describe('CPFValidatorUtil', () => {
  describe('isValidCPF()', () => {
    describe('when validate if string is valid cpf', () => {
      it('should return true to cpf with mask', () => {
        const result = CPFValidatorUtil.isValidCPF('644.142.830-00');
        expect(result).toEqual(true);
      });

      it('should return true to cpf without mask', () => {
        const result = CPFValidatorUtil.isValidCPF('24478643024');
        expect(result).toEqual(true);
      });
    });

    describe('when string is not a valid cpf', () => {
      it('should return false for invalid digits', () => {
        const result = CPFValidatorUtil.isValidCPF('12345678900');
        expect(result).toEqual(false);
      });
      it('should return false for incomplete cpf', () => {
        const result = CPFValidatorUtil.isValidCPF('244.786.430');
        expect(result).toEqual(false);
      });
    });

    describe('when string is empty', () => {
      it('should return false', () => {
        const result = CPFValidatorUtil.isValidCPF('');
        expect(result).toEqual(false);
      });
    });

    describe('when string is null', () => {
      it('should return false', () => {
        const result = CPFValidatorUtil.isValidCPF(null);
        expect(result).toEqual(false);
      });
    });

    describe('when string is undefined', () => {
      it('should return false', () => {
        const result = CPFValidatorUtil.isValidCPF(undefined);
        expect(result).toEqual(false);
      });
    });
  });
});
