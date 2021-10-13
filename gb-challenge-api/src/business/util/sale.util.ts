export class SaleUtil {
  static calculateCashback(value: number): {
    cashback_value: number;
    cashback_percentage: number;
  } {
    if (value === null) return null;
    if (value === undefined) return undefined;
    
    if (!value || value <= 0) {
      return {
        cashback_value: 0,
        cashback_percentage: 0,
      };
    }

    let cashback_percentage = 10;

    if (value >= 1000 && value <= 1500) {
      cashback_percentage = 15;
    }

    if (value > 1500) {
      cashback_percentage = 20;
    }

    const cashback_value = Number(
      ((cashback_percentage * value) / 100).toFixed(2),
    );
    return {
      cashback_value,
      cashback_percentage,
    };
  }
}
