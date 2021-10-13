import { Injectable, NotFoundException } from '@nestjs/common';
import { DealerRepository } from '../../infrastructure/repository/dealer.repository';
import { SaleRepository } from '../../infrastructure/repository/sale.repository';
import { Sale } from '../../infrastructure/schema/sale.schema';
import { SaleEnum, SaleStatusEnum } from '../enum/sale.enum';
import { SaleModelMapper } from '../mapper/sale.model.mapper';
import { SaleModel } from '../model/sale.model';
import { SaleUtil } from '../util/sale.util';

@Injectable()
export class SaleService {
  constructor(
    private readonly _repository: SaleRepository,
    private readonly _dealerRepository: DealerRepository,
    private readonly _mapper: SaleModelMapper,
  ) {}

  async create(item: SaleModel): Promise<SaleModel> {
    await this.checkExistsDealer(item.dealer_cpf);
    const sale: Sale = this._mapper.deserialize(item);
    const result: Sale = await this._repository.create(
      this.setGeneratedInfo(sale),
    );
    return this._mapper.serialize(result);
  }

  async find(): Promise<SaleModel[]> {
    const result: Sale[] = await this._repository.find();
    return result.map((item: Sale) => this._mapper.serialize(item));
  }

  async findById(_id: string): Promise<SaleModel> {
    const result: Sale = await this._repository.findOne({ _id });
    if (!result) {
      throw new NotFoundException('Sale not found or already removed.');
    }
    return this._mapper.serialize(result);
  }

  async updateById(_id: string, item: SaleModel): Promise<SaleModel> {
    if (item.dealer_cpf) {
      await this.checkExistsDealer(item.dealer_cpf);
    }
    const sale: Sale = this._mapper.deserialize(item);
    const result: Sale = await this._repository.updateOne(
      { _id },
      this.setGeneratedInfo(sale),
    );
    if (!result) {
      throw new NotFoundException('Sale not found or already removed.');
    }
    return this._mapper.serialize(result);
  }

  async deleteById(_id: string): Promise<void> {
    const result: Sale = await this._repository.deleteOne({ _id });
    if (!result) {
      throw new NotFoundException('Sale not found or already removed.');
    }
  }

  private async checkExistsDealer(dealerCpf: string): Promise<void> {
    const dealerExists: boolean = await this._dealerRepository.checkExists({
      cpf: dealerCpf,
    });
    if (!dealerExists) {
      throw new NotFoundException('Dealer not found or already removed.');
    }
  }

  private setGeneratedInfo(sale: Sale): Sale {
    sale.status = SaleStatusEnum.IN_VALIDATION;

    if (sale.dealer_cpf === SaleEnum.DEALER_CPF_ALWAYS_APPROVE_SALE) {
      sale.status = SaleStatusEnum.APPROVED;
    }

    if (sale.value) {
      sale.value = Number(sale.value.toFixed(2));
      const { cashback_percentage, cashback_value } =
        SaleUtil.calculateCashback(sale.value);
      sale.cashback_percentage = cashback_percentage;
      sale.cashback_percentage = 20;
      sale.cashback_value = cashback_value;
    }
    return sale;
  }
}
