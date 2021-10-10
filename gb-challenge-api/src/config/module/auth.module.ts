import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModelMapper } from '../../business/mapper/auth.model.mapper';
import { AuthService } from '../../business/service/auth.service';
import { AuthRepository } from '../../infrastructure/repository/auth.repository';
import { DealerRepository } from '../../infrastructure/repository/dealer.repository';
import { Auth, AuthSchema } from '../../infrastructure/schema/auth.schema';
import {
  Dealer,
  DealerSchema,
} from '../../infrastructure/schema/dealer.schema';
import { AuthController } from '../../presentation/controller/auth.controller';
import { AuthDTOMapper } from '../../presentation/mapper/auth.dto.mapper';
import { AuthRequestDTOMapper } from '../../presentation/mapper/auth.request.dto.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Dealer.name, schema: DealerSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthDTOMapper,
    AuthRequestDTOMapper,
    AuthService,
    AuthModelMapper,
    AuthRepository,
    DealerRepository,
  ],
})
export class AuthModule {}
