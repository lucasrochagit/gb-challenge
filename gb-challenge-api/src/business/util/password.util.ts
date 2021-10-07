import * as bcrypt from 'bcrypt';

export class PasswordUtil {
  public static encryptPassword(text: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(text, salt);
  }

  public static isSamePassword(text: string, encryptedText: string): boolean {
    return bcrypt.compareSync(text, encryptedText);
  }
}
