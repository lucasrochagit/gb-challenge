import { Injectable } from '@nestjs/common';
import { RequestRepository } from '../../infrastructure/repository/request.repository';
import { CashbackModelMapper } from '../mapper/cashback.model.mapper';
import { CashbackModel } from '../model/cashback.model';

@Injectable()
export class CashbackService {
  constructor(
    private readonly _repository: RequestRepository,
    private readonly _mapper: CashbackModelMapper,
  ) {}

  async getCashbackAmount(cpf: string): Promise<CashbackModel> {
    const { CASHBACK_AMOUNT_API_URL, CASHBACK_AMOUNT_API_TOKEN } = process.env;

    const onlyNumbersCPF: string = cpf.replace(/\D+/g, '');
    const url: string = `${CASHBACK_AMOUNT_API_URL}?cpf=${onlyNumbersCPF}`;
    const headers: any = { token: CASHBACK_AMOUNT_API_TOKEN };

    const result: any = await this._repository.get({ url, headers });
    return this._mapper.serialize({
      cpf,
      ...result,
    });
  }
}
