import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { DealerPasswordModel } from '../../business/model/dealer.password.model';
import { DealerService } from '../../business/service/dealer.service';
import {
  MethodByIdDealerPasswordDTO,
  UpdateDealerPasswordDTO,
} from '../dto/dealer.password.dto';
import { DealerPasswordDTOMapper } from '../mapper/dealer.password.dto.mapper';

@Controller('dealers/:dealer_id/password')
export class DealerPasswordController {
  constructor(
    private readonly _service: DealerService,
    private readonly _mapper: DealerPasswordDTOMapper,
  ) {}

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePasssword(
    @Param() params: MethodByIdDealerPasswordDTO,
    @Body() dto: UpdateDealerPasswordDTO,
  ): Promise<void> {
    const model: DealerPasswordModel = this._mapper.deserialize(dto);
    return this._service.updatePassword(params.dealer_id, model);
  }
}
