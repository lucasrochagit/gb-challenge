import { HttpStatus } from '@nestjs/common';
import { getCpf, getId, getInt } from 'json-generator';
import { CashbackModel } from '../../src/business/model/cashback.model';
import { CashbackDTO } from '../../src/presentation/dto/cashback.dto';

export class CashbackMock {
  static asBodyResponse(info: any): any {
    return {
      statusCode: HttpStatus.OK,
      body: {
        credit: info.cashback_amount,
      },
      cpf: info.dealer_cpf,
    };
  }

  static asModelResponse(info: any): CashbackModel {
    const result: CashbackModel = new CashbackModel();

    result.cashback_amount = info.cashback_amount;
    result.dealer_cpf = info.dealer_cpf;

    return result;
  }

  static getInfo(): any {
    return {
      cashback_amount: getInt(200, 3000),
      dealer_cpf: getCpf(true),
    };
  }

  static asDTOResponse(info: any): CashbackDTO {
    const result: CashbackDTO = {} as CashbackDTO;

    result.cashback_amount = info.cashback_amount;
    result.dealer_cpf = info.dealer_cpf;

    return result;
  }
}
