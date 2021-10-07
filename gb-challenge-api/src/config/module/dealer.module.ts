import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DealerService } from '../../business/service/dealer.service';
import { Serializer } from '../../common/serializer/serializer';
import { DealerRepository } from '../../infrastructure/repository/dealer.repository';
import {
  Dealer,
  DealerSchema,
} from '../../infrastructure/schema/dealer.schema';
import { DealerController } from '../../presentation/controller/dealer.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dealer.name, schema: DealerSchema }]),
  ],
  controllers: [DealerController],
  providers: [DealerService, DealerRepository, Serializer],
})
export class DealerModule {}
