import { Injectable } from '@nestjs/common';
import { IMapper } from '../../common/interface/mapper/mapper.interface';
import { Sale } from '../../infrastructure/schema/sale.schema';
import { SaleModel } from '../model/sale.model';

@Injectable()
export class SaleModelMapper implements IMapper<SaleModel, Sale> {
  serialize(target: Sale): SaleModel {
    const result: SaleModel = new SaleModel();
    if (!target) return result;

    if (target.id) result.id = target.id;
    if (target.code) result.code = target.code;
    if (target.value) result.value = target.value;
    if (target.date) result.date = target.date;
    if (target.status) result.status = target.status;
    if (target.cashback_percentage)
      result.cashback_percentage = target.cashback_percentage;
    if (target.cashback_value) result.cashback_value = target.cashback_value;
    if (target.dealer_cpf) result.dealer_cpf = target.dealer_cpf;
    if (target.created_at) result.created_at = target.created_at;
    if (target.updated_at) result.updated_at = target.updated_at;

    return result;
  }

  deserialize(source: SaleModel): Sale {
    const result: Sale = new Sale();
    if (!source) return result;

    if (source.code) result.code = source.code;
    if (source.value) result.value = source.value;
    if (source.date) result.date = source.date;
    if (source.status) result.status = source.status;
    if (source.cashback_percentage)
      result.cashback_percentage = source.cashback_percentage;
    if (source.cashback_value) result.cashback_value = source.cashback_value;
    if (source.dealer_cpf) result.dealer_cpf = source.dealer_cpf;

    return result;
  }
}
