import { Injectable } from '@nestjs/common';
import { IMapper } from '../../common/interface/mapper/mapper.interface';
import { CashbackModel } from '../model/cashback.model';

@Injectable()
export class CashbackModelMapper implements IMapper<CashbackModel, any> {
  serialize(target: any): CashbackModel {
    const result: CashbackModel = new CashbackModel();
    if (!target) return result;

    if (target.cpf) result.dealer_cpf = target.cpf;
    if (target.body) {
      if (target.body.credit) result.cashback_amount = target.body.credit;
    }

    return result;
  }

  deserialize(source: CashbackModel) {
    throw new Error('Method not implemented.');
  }
}
