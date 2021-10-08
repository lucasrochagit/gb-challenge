export class AlphaValidatorUtil {
  static isAlphaWithSpaces(cpf: string): boolean {
    if(!cpf) return false;
    return /^([A-ZÀ-Üa-zà-ü]+\s?)*(?<! )$/.test(cpf);
  }
}
