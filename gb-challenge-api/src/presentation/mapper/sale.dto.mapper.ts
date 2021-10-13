import { Injectable } from '@nestjs/common';
import { SaleModel } from '../../business/model/sale.model';
import { IMapper } from '../../common/interface/mapper/mapper.interface';
import { SaleDTO } from '../dto/sale.dto';

@Injectable()
export class SaleDTOMapper implements IMapper<SaleDTO, SaleModel> {
  serialize(target: SaleModel): SaleDTO {
    const result: SaleDTO = {} as SaleDTO;
    if (!target) return result;

    if (target.id) result.id = target.id;
    if (target.code) result.code = target.code;
    if (target.value) result.value = target.value;
    if (target.date) result.date = target.date;
    if (target.status) result.status = target.status;
    if (target.cashback_percentage)
      result.cashback_percentage = target.cashback_percentage;
    if (target.cashback_value) result.cashback_value = target.cashback_value;

    return result;
  }

  deserialize(source: SaleDTO): SaleModel {
    const result: SaleModel = new SaleModel();
    if (!source) return result;

    if (source.code) result.code = source.code;
    if (source.value) result.value = source.value;
    if (source.date) result.date = source.date;
    if (source.dealer_cpf) result.dealer_cpf = source.dealer_cpf;

    return result;
  }
}
