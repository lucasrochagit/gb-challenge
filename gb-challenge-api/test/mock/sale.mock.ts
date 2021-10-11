import { getId } from 'json-generator';
import { SaleStatusEnum } from '../../src/business/enum/sale.enum';
import { SaleModel } from '../../src/business/model/sale.model';
import { Sale } from '../../src/infrastructure/schema/sale.schema';
import { SaleDTO } from '../../src/presentation/dto/sale.dto';

export class SaleMock {
  static asDocumentRequest(info: any): Sale {
    const result: Sale = new Sale();

    result.dealer_cpf = info.dealer_cpf;
    result.cashback_value = info.cashback_value;
    result.cashback_percentage = info.cashback_percentage;
    result.status = info.status;
    result.date = info.date;
    result.value = info.value;
    result.code = info.code;

    return result;
  }

  static asDocumentResponse(info: any): Sale {
    const result: Sale = new Sale();

    result.id = info.id;
    result.dealer_cpf = info.dealer_cpf;
    result.cashback_value = info.cashback_value;
    result.cashback_percentage = info.cashback_percentage;
    result.status = info.status;
    result.date = info.date;
    result.value = info.value;
    result.code = info.code;
    result.created_at = info.created_at;
    result.updated_at = info.updated_at;

    return result;
  }

  static asModelRequest(info: any): SaleModel {
    const result: SaleModel = new SaleModel();

    result.dealer_cpf = info.dealer_cpf;
    result.date = info.date;
    result.value = info.value;
    result.code = info.code;

    return result;
  }

  static asModelResponse(info: any): SaleModel {
    const result: SaleModel = new SaleModel();

    result.id = info.id;
    result.dealer_cpf = info.dealer_cpf;
    result.cashback_value = info.cashback_value;
    result.cashback_percentage = info.cashback_percentage;
    result.status = info.status;
    result.date = info.date;
    result.value = info.value;
    result.code = info.code;
    result.created_at = info.created_at;
    result.updated_at = info.updated_at;

    return result;
  }

  static asDTORequest(info: any): SaleDTO {
    const result: SaleDTO = {} as SaleDTO;

    result.dealer_cpf = info.dealer_cpf;
    result.date = info.date;
    result.value = info.value;
    result.code = info.code;

    return result;
  }

  static asDTOResponse(info: any): SaleDTO {
    const result: SaleDTO = {} as SaleDTO;

    result.cashback_value = info.cashback_value;
    result.cashback_percentage = info.cashback_percentage;
    result.status = info.status;
    result.date = info.date;
    result.value = info.value;
    result.code = info.code;

    return result;
  }

  static getInfo(): any {
    const now: Date = new Date();
    const _id: string = getId('objectId');
    const dealerCpf: string = getId('objectId');
    const cashbackValue: number = 20;
    const cashbackPercentage: number = 200;
    const status: string = SaleStatusEnum.IN_VALIDATION;
    const date = now.toLocaleDateString();
    const value = 400;
    const code: string = now.toISOString().replace(/\D+/g, '');
    const createdAt = now.toISOString();
    const updatedAt = now.toISOString();

    return {
      id: _id,
      dealer_cpf: dealerCpf,
      cashback_value: cashbackValue,
      cashback_percentage: cashbackPercentage,
      status: status,
      date: date,
      value: value,
      code: code,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }
}
