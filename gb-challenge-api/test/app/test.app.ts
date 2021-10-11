import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { AppService } from '../../src/business/service/app.service';
import { AllExceptionsFilter } from '../../src/config/filter/exception.filter';
import { AuthModule } from '../../src/config/module/auth.module';
import { CashbackModule } from '../../src/config/module/cashback.module';
import { DealerModule } from '../../src/config/module/dealer.module';
import { SaleModule } from '../../src/config/module/sale.module';
import { AppController } from '../../src/presentation/controller/app.controller';

export async function bootstrapTest(): Promise<INestApplication> {
  const moduleFixture = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.TEST_DATABASE_URL),
      AuthModule,
      CashbackModule,
      DealerModule,
      SaleModule,
    ],
    controllers: [AppController],
    providers: [AppService],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  return app;
}

