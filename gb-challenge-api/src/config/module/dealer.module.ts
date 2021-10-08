import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DealerModelMapper } from '../../business/mapper/dealer.model.mapper';
import { DealerService } from '../../business/service/dealer.service';
import { DealerRepository } from '../../infrastructure/repository/dealer.repository';
import {
  Dealer,
  DealerSchema
} from '../../infrastructure/schema/dealer.schema';
import { DealerController } from '../../presentation/controller/dealer.controller';
import { DealerPasswordController } from '../../presentation/controller/dealer.password.controller';
import { DealerDTOMapper } from '../../presentation/mapper/dealer.dto.mapper';
import { DealerPasswordDTOMapper } from '../../presentation/mapper/dealer.password.dto.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dealer.name, schema: DealerSchema }]),
  ],
  controllers: [DealerController, DealerPasswordController],
  providers: [
    DealerDTOMapper,
    DealerPasswordDTOMapper,
    DealerService,
    DealerRepository,
    DealerModelMapper,
  ],
})
export class DealerModule {}
