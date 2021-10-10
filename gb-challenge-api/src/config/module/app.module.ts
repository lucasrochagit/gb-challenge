import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from '../../business/service/app.service';
import { AppController } from '../../presentation/controller/app.controller';
import { AuthModule } from './auth.module';
import { CashbackModule } from './cashback.module';
import { DealerModule } from './dealer.module';
import { SaleModule } from './sale.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    CashbackModule,
    DealerModule,
    SaleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
