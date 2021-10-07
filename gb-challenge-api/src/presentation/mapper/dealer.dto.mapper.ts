import { Injectable } from '@nestjs/common';
import { DealerModel } from '../../business/model/dealer.model';
import { IMapper } from '../../common/interface/mapper/mapper.interface';
import { Dealer } from '../../infrastructure/schema/dealer.schema';
import { DealerDTO } from '../dto/dealer.dto';

@Injectable()
export class DealerDTOMapper implements IMapper<DealerDTO, DealerModel> {
  serialize(target: DealerModel): DealerDTO {
    const result: DealerDTO = {} as DealerDTO;

    if (target.id) result.id = target.id;
    if (target.full_name) result.full_name = target.full_name;
    if (target.cpf) result.cpf = target.cpf;
    if (target.email) result.email = target.email;
    if (target.created_at) result.created_at = target.created_at;
    if (target.updated_at) result.updated_at = target.updated_at;

    return result;
  }

  deserialize(source: DealerDTO): DealerModel {
    const result: DealerModel = new DealerModel();

    if (source.full_name) result.full_name = source.full_name;
    if (source.cpf) result.cpf = source.cpf;
    if (source.email) result.email = source.email;
    if (source.password) result.password = source.password;

    return result;
  }
}
