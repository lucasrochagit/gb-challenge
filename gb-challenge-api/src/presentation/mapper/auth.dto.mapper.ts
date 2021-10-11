import { Injectable } from '@nestjs/common';
import { AuthModel } from '../../business/model/auth.model';
import { IMapper } from '../../common/interface/mapper/mapper.interface';
import { AuthDTO } from '../dto/auth.dto';

@Injectable()
export class AuthDTOMapper implements IMapper<AuthDTO, AuthModel> {
  serialize(target: AuthModel): AuthDTO {
    const result: AuthDTO = {} as AuthDTO;
    if (!target) return result;

    if (target.access_token) result.access_token = target.access_token;
    if (target.refresh_token) result.refresh_token = target.refresh_token;
    if (target.token_type) result.token_type = target.token_type;
    if (target.expires_in) result.expires_in = target.expires_in;

    return result;
  }

  deserialize(source: AuthDTO): AuthModel {
    const result: AuthModel = new AuthModel();
    if (!source) return result;

    if (source.access_token) result.access_token = source.access_token;
    if (source.refresh_token) result.refresh_token = source.refresh_token;

    return result;
  }
}
