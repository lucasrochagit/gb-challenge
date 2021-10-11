import { getId } from 'json-generator';
import { AuthModel } from '../../src/business/model/auth.model';
import { AuthRequestModel } from '../../src/business/model/auth.request.model';
import { TokenUtil } from '../util/token.util';
import { Auth } from '../../src/infrastructure/schema/auth.schema';
import { AuthDTO, AuthRequestDTO } from '../../src/presentation/dto/auth.dto';

export class AuthMock {
  static asDocumentRequest(info: any): Auth {
    const result: Auth = new Auth();

    result.access_token = info.access_token;
    result.token_type = info.token_type;
    result.refresh_token = info.refresh_token;
    result.expires_in = info.expires_in;
    result.owner = info.owner;

    return result;
  }

  static asDocumentResponse(info: any): Auth {
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

  static asAuthModelRequest(info: any): AuthRequestModel {
    const result: AuthRequestModel = new AuthRequestModel();

    result.login = info.login;
    result.password = info.password;

    return result;
  }

  static asModelRequest(info: any): AuthModel {
    const result: AuthModel = new AuthModel();

    result.access_token = info.access_token;
    result.refresh_token = info.refresh_token;
    result.expires_in = info.expires_in;
    result.owner = info.owner;

    return result;
  }

  static asModelResponse(info: any): AuthModel {
    const result: AuthModel = new AuthModel();

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

  static asModelRefreshTokenRequest(info: any): AuthModel {
    const result: AuthModel = new AuthModel();

    result.access_token = info.access_token;
    result.refresh_token = info.refresh_token;

    return result;
  }

  static asDTOAuthRequest(info: any): AuthRequestDTO {
    const result: AuthRequestDTO = new AuthRequestDTO();

    result.login = info.login;
    result.password = info.password;

    return result;
  }
  
  static asDTORequest(info: any): AuthModel {
    const result: AuthModel = new AuthModel();

    result.access_token = info.access_token;
    result.refresh_token = info.refresh_token;

    return result;
  }

  static asDTOResponse(info: any): AuthDTO {
    const result: AuthDTO = {} as AuthDTO;

    result.access_token = info.access_token;
    result.token_type = info.token_type;
    result.refresh_token = info.refresh_token;
    result.expires_in = info.expires_in;

    return result;
  }

  static getInfo(): any {
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
