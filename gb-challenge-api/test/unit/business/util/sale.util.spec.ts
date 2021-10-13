import { SaleUtil } from '../../../../src/business/util/sale.util';

describe('SaleUtil', () => {
  describe('when value is below R$ 1000,00', () => {
    it('should return 10% of cashback', () => {
      const result = SaleUtil.calculateCashback(200);
      expect(result).toMatchObject({
        cashback_value: 20,
        cashback_percentage: 10,
      });
    });
  });

  describe('when value is between R$ 1000,00 and R$ 1500,00', () => {
    it('should return 15% of cashback', () => {
      const result = SaleUtil.calculateCashback(1200);
      expect(result).toMatchObject({
        cashback_value: 180,
        cashback_percentage: 15,
      });
    });
  });

  describe('when value is between is above 1500,00', () => {
    it('should return 20% of cashback', () => {
      const result = SaleUtil.calculateCashback(2000);
      expect(result).toMatchObject({
        cashback_value: 400,
        cashback_percentage: 20,
      });
    });
  });

  describe('when value is less than or equal zero', () => {
    it('should return zero of cashback', () => {
      const result = SaleUtil.calculateCashback(-15);
      expect(result).toMatchObject({
        cashback_value: 0,
        cashback_percentage: 0,
      });
    });
  });

  describe('when value is null', () => {
    it('should return null', () => {
      const result = SaleUtil.calculateCashback(null);
      expect(result).toBeNull();
    });
  });

  describe('when value is undefined', () => {
    it('should return undefined', () => {
      const result = SaleUtil.calculateCashback(undefined);
      expect(result).toBeUndefined();
    });
  });
});
