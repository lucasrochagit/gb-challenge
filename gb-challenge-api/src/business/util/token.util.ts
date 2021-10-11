import { randomBytes } from 'crypto';
import { sign, decode } from 'jsonwebtoken';

export class TokenUtil {
  static generateAccessToken(ownerId: string): string {
    const { JWT_SECRET, JWT_EXPIRATION } = process.env;
    if (!ownerId) return undefined;

    try {
      return sign(
        {
          sub: ownerId,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION },
      );
    } catch (err) {
      return undefined;
    }
  }

  static generateRefreshToken(): string {
    return randomBytes(32).toString('hex');
  }

  static getTokenPayloadSub(token: string): string {
    try {
      const payload = decode(token, { json: true });
      return payload.sub ?? undefined;
    } catch (err) {
      return undefined;
    }
  }

  static getTokenPayloadExp(token: string): number {
    try {
      const payload = decode(token, { json: true });
      return payload.exp ?? undefined;
    } catch (err) {
      return undefined;
    }
  }
}
