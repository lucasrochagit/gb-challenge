export class DateValidatorUtil {
  static isValidLocaleDate(date: string): boolean {
    if (!date) return false;
    if (!/^((0[1-9]|1\d|2\d|3[0,1])\/(0[1-9]|1[0-2])\/\d\d\d\d)$/.test(date)) {
      return false;
    }
    const [day, month, year] = date.split('/');

    if (month === '02') {
      if (this.isLeapYear(+year)) {
        return +day <= 29;
      }
      return +day <= 28;
    }

    const monthsWithThirtyDays: string[] = ['04', '06', '09', '11'];

    if (monthsWithThirtyDays.includes(month)) {
      return +day <= 30;
    }

    return true;
  }

  private static isLeapYear(year: number): boolean {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }
}
