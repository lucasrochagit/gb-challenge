import { Injectable } from '@nestjs/common';
import { IMapper } from '../../common/interface/mapper/mapper.interface';
import { Auth } from '../../infrastructure/schema/auth.schema';
import { AuthModel } from '../model/auth.model';

@Injectable()
export class AuthModelMapper implements IMapper<AuthModel, Auth> {
  serialize(target: Auth): AuthModel {
    const result: AuthModel = new AuthModel();

    if (target.id) result.id = target.id;
    if (target.access_token) result.access_token = target.access_token;
    if (target.token_type) result.token_type = target.token_type;
    if (target.refresh_token) result.refresh_token = target.refresh_token;
    if (target.expires_in) result.expires_in = target.expires_in;
    if (target.owner) result.owner = target.owner;
    if (target.created_at) result.created_at = target.created_at;
    if (target.updated_at) result.updated_at = target.updated_at;

    return result;
  }

  deserialize(source: AuthModel): Auth {
    const result: Auth = new Auth();

    if (source.access_token) result.access_token = source.access_token;
    if (source.refresh_token) result.refresh_token = source.refresh_token;
    if (source.expires_in) result.expires_in = source.expires_in;
    if (source.owner) result.owner = source.owner;

    return result;
  }
}
