import * as bcrypt from 'bcrypt';

export class PasswordUtil {
  public static encryptPassword(text: string): string {
    if (!text) return undefined;
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(text, salt);
  }

  public static isSamePassword(text: string, encryptedText: string): boolean {
    if (!text || !encryptedText) return false;
    return bcrypt.compareSync(text, encryptedText);
  }
}
