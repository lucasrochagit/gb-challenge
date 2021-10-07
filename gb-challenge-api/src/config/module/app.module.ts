import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from '../../business/service/app.service';
import { AppController } from '../../presentation/controller/app.controller';
import { DealerModule } from './dealer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    DealerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
