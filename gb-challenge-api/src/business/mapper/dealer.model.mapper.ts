import { Injectable } from '@nestjs/common';
import { IMapper } from '../../common/interface/mapper/mapper.interface';
import { Dealer } from '../../infrastructure/schema/dealer.schema';
import { DealerModel } from '../model/dealer.model';

@Injectable()
export class DealerModelMapper implements IMapper<DealerModel, Dealer> {
  serialize(target: Dealer): DealerModel {
    const result: DealerModel = new DealerModel();

    if (target['_id']) result.id = target['_id'];
    if (target.full_name) result.full_name = target.full_name;
    if (target.cpf) result.cpf = target.cpf;
    if (target.email) result.email = target.email;
    if (target['created_at']) result.created_at = target['created_at'];
    if (target['updated_at']) result.updated_at = target['updated_at'];

    return result;
  }

  deserialize(source: DealerModel): Dealer {
    const result: Dealer = new Dealer();

    if (source.full_name) result.full_name = source.full_name;
    if (source.cpf) result.cpf = source.cpf;
    if (source.email) result.email = source.email;
    if (source.password) result.password = source.password;

    return result;
  }
}
