import { Injectable } from '@nestjs/common';
import { CashbackModel } from '../../business/model/cashback.model';
import { CashbackDTO } from '../dto/cashback.dto';
import { IMapper } from '../../common/interface/mapper/mapper.interface';

@Injectable()
export class CashbackDTOMapper implements IMapper<CashbackDTO, CashbackModel> {
  serialize(target: CashbackModel): CashbackDTO {
    const result: CashbackDTO = {} as CashbackDTO;
    if (!target) return result;

    if (target.dealer_cpf) result.dealer_cpf = target.dealer_cpf;
    if (target.cashback_amount) result.cashback_amount = target.cashback_amount;

    return result;
  }

  deserialize(source: CashbackDTO): CashbackModel {
    throw new Error('Method not implemented.');
  }
}
