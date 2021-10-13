export class SaleUtil {
  static calculateCashback(value: number): {
    cashback_value: number;
    cashback_percentage: number;
  } {
    let cashback_percentage = 0.1;

    if (value >= 1000 && value <= 1500) {
      cashback_percentage = 0.15;
    }

    if (value > 1500) {
      cashback_percentage = 0.2;
    }

    const cashback_value = Number((cashback_percentage * value).toFixed(2));
    return {
      cashback_value,
      cashback_percentage,
    };
  }
}
