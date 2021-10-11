import { randomBytes } from 'crypto';
import { getStr } from 'json-generator';
import { sign, decode } from 'jsonwebtoken';

export class TokenUtil {
  static generateAccessToken(ownerId: string): string {
    if (!ownerId) return undefined;

    try {
      return sign(
        {
          sub: ownerId,
        },
        getStr(36, 'hex'),
        { expiresIn: '1h' },
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
