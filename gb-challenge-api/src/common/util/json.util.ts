export class JsonUtil {
  static isJSONString(str: string): boolean {
    try {
      if (!str) return false;
      const json = JSON.parse(str);
      return typeof json === 'object';
    } catch (e) {
      return false;
    }
  }
}
