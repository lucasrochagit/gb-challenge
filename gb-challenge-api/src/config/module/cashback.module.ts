import { Module } from '@nestjs/common';
import { CashbackModelMapper } from '../../business/mapper/cashback.model.mapper';
import { CashbackService } from '../../business/service/cashback.service';
import { RequestRepository } from '../../infrastructure/repository/request.repository';
import { CashbackController } from '../../presentation/controller/cashback.controller';
import { CashbackDTOMapper } from '../../presentation/mapper/cashback.dto.mapper';

@Module({
  imports: [],
  controllers: [CashbackController],
  providers: [
    CashbackDTOMapper,
    CashbackService,
    CashbackModelMapper,
    RequestRepository,
  ],
})
export class CashbackModule {}
