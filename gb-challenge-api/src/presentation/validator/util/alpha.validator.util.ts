export class AlphaValidatorUtil {
  static isAlphaWithSpaces(str: string): boolean {
    if(!str) return false;
    return /^([A-ZÀ-Üa-zà-ü]+\s?)*(?<! )$/.test(str);
  }
}
