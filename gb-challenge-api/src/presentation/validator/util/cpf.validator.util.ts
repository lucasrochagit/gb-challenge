export class CPFValidatorUtil {
  static isValidCPF(cpf: string): boolean {
    if (!cpf) return false;
    const onlyNumbersCPF: string = cpf.replace(/\D+/g, '');

    if (onlyNumbersCPF.length !== 11) {
      return false;
    }

    const [a, b, c, d, e, f, g, h, i, j, k]: number[] = [...onlyNumbersCPF].map(
      (num) => parseInt(num, 10),
    );

    const firstDigit: number =
      (a * 10 + b * 9 + c * 8 + d * 7 + e * 6 + f * 5 + g * 4 + h * 3 + i * 2) %
      11;
    const expectFirstDigit: number = firstDigit < 2 ? 0 : 11 - firstDigit;
    const secondDigit: number =
      (a * 11 +
        b * 10 +
        c * 9 +
        d * 8 +
        e * 7 +
        f * 6 +
        g * 5 +
        h * 4 +
        i * 3 +
        expectFirstDigit * 2) %
      11;
    const expectSecondDigit: number = secondDigit < 2 ? 0 : 11 - secondDigit;

    return expectFirstDigit === j && expectSecondDigit === k;
  }
}
