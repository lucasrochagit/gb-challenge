import { getId } from 'json-generator';
import { TokenUtil } from '../../src/business/util/token.util';
import { Auth } from '../../src/infrastructure/schema/auth.schema';

export class AuthMock {
  static asDocumentRequest(): Auth {
    const info: any = this.getInfo();
    const result: Auth = new Auth();

    result.access_token = info.access_token;
    result.token_type = info.token_type;
    result.refresh_token = info.refresh_token;
    result.expires_in = info.expires_in;
    result.owner = info.owner;

    return result;
  }

  static asDocumentResponse(): Auth {
    const info: any = this.getInfo();
    const result: Auth = new Auth();

    result.id = info.id;
    result.access_token = info.access_token;
    result.token_type = info.token_type;
    result.refresh_token = info.refresh_token;
    result.expires_in = info.expires_in;
    result.owner = info.owner;
    result.created_at = info.created_at;
    result.updated_at = info.updated_at;

    return result;
  }

  private static getInfo(): any {
    const _id: string = getId('objectId');
    const ownerId: string = getId('objectId');
    const accessToken: string = TokenUtil.generateAccessToken(_id);
    const refreshToken: string = TokenUtil.generateRefreshToken();
    const expiresIn: number = TokenUtil.getTokenPayloadExp(accessToken);
    const createdAt: string = new Date().toISOString();
    const updatedAt: string = createdAt;

    return {
      id: _id,
      access_token: accessToken,
      token_type: 'Bearer',
      refresh_token: refreshToken,
      expires_in: expiresIn,
      owner: ownerId,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }
}
