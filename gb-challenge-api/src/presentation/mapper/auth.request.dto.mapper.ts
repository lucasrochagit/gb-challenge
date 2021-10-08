import { Injectable } from '@nestjs/common';
import { AuthRequestModel } from '../../business/model/auth.request.model';
import { IMapper } from '../../common/interface/mapper/mapper.interface';
import { AuthRequestDTO } from '../dto/auth.dto';

@Injectable()
export class AuthRequestDTOMapper
  implements IMapper<AuthRequestDTO, AuthRequestModel>
{
  serialize(target: AuthRequestModel): AuthRequestDTO {
    throw new Error('Method not implemented.');
  }

  deserialize(source: AuthRequestDTO): AuthRequestModel {
    const result: AuthRequestModel = new AuthRequestModel();

    if (source.login) result.login = source.login;
    if (source.password) result.password = source.password;

    return result;
  }
}
