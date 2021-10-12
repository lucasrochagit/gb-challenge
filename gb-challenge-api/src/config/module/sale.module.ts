import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleModelMapper } from '../../business/mapper/sale.model.mapper';
import { SaleService } from '../../business/service/sale.service';
import { DealerRepository } from '../../infrastructure/repository/dealer.repository';
import { SaleRepository } from '../../infrastructure/repository/sale.repository';
import { Dealer, DealerSchema } from '../../infrastructure/schema/dealer.schema';
import { Sale, SaleSchema } from '../../infrastructure/schema/sale.schema';
import { SaleController } from '../../presentation/controller/sale.controller';
import { SaleDTOMapper } from '../../presentation/mapper/sale.dto.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sale.name, schema: SaleSchema },
      { name: Dealer.name, schema: DealerSchema },
    ]),
  ],
  controllers: [SaleController],
  providers: [
    SaleDTOMapper,
    SaleService,
    SaleModelMapper,
    SaleRepository,
    DealerRepository,
  ],
})
export class SaleModule {}
