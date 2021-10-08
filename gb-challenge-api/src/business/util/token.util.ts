import { randomBytes } from 'crypto';
import { sign, decode } from 'jsonwebtoken';

export class TokenUtil {
  static generateAccessToken(ownerId: string): string {
    const { JWT_SECRET, JWT_EXPIRATION } = process.env;

    return sign(
      {
        sub: ownerId,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION },
    );
  }

  static generateRefreshToken(): string {
    return randomBytes(32).toString('hex');
  }

  static getTokenPayload(token: string) {
    try {
      return decode(token);
    } catch (err) {
      return null;
    }
  }

  static getTokenPayloadSub(token: string): string {
    try {
      const payload = decode(token, { json: true });
      return payload.sub ?? null;
    } catch (err) {
      return null;
    }
  }

  static getTokenPayloadExp(token: string): number {
    try {
      const payload = decode(token, { json: true });
      return payload.exp ?? null;
    } catch (err) {
      return null;
    }
  }
}
