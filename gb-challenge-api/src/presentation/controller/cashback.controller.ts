import { Controller, Get, Query } from '@nestjs/common';
import { CashbackModel } from '../../business/model/cashback.model';
import { CashbackService } from '../../business/service/cashback.service';
import { FindCashbackByDealerCpfDTO } from '../dto/cashback.dto';
import { CashbackDTOMapper } from '../mapper/cashback.dto.mapper';

@Controller('cashback')
export class CashbackController {
  constructor(
    private readonly _service: CashbackService,
    private readonly _mapper: CashbackDTOMapper,
  ) {}

  @Get()
  async getCashbackAmount(@Query() query: FindCashbackByDealerCpfDTO) {
    const result: CashbackModel = await this._service.getCashbackAmount(
      query.cpf,
    );
    return this._mapper.serialize(result);
  }
}
