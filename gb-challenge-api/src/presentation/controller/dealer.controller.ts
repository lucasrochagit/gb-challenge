import { Body, Controller, Post } from '@nestjs/common';
import { DealerModel } from '../../business/model/dealer.model';
import { DealerService } from '../../business/service/dealer.service';
import { CreateDealerDTO, DealerDTO } from '../dto/dealer.dto';
import { DealerDTOMapper } from '../mapper/dealer.dto.mapper';

@Controller('dealers')
export class DealerController {
  constructor(
    private readonly _service: DealerService,
    private readonly _mapper: DealerDTOMapper,
  ) {}

  @Post()
  async create(@Body() dto: CreateDealerDTO): Promise<DealerDTO> {
    const model: DealerModel = this._mapper.deserialize(dto);
    const result: DealerModel = await this._service.create(model);
    return this._mapper.serialize(result);
  }
}
