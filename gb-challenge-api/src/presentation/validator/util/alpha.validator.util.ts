export class AlphaValidatorUtil {
  static isAlphaWithSpaces(cpf: string): boolean {
    return /^([A-ZÀ-Üa-zà-ü]+\s?)*(?<! )$/.test(cpf);
  }
}
