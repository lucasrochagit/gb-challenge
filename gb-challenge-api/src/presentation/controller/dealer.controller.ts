import { Body, Controller, Post } from '@nestjs/common';
import { DealerModel } from '../../business/model/dealer.model';
import { DealerService } from '../../business/service/dealer.service';
import { Serializer } from '../../common/serializer/serializer';
import { CreateDealerDTO, DealerDTO } from '../dto/dealer.dto';

@Controller('dealers')
export class DealerController {
  constructor(
    private readonly _service: DealerService,
    private readonly _serializer: Serializer<DealerModel, DealerDTO>,
  ) {}

  @Post()
  async create(@Body() dto: CreateDealerDTO): Promise<DealerDTO> {
    const model: DealerModel = this._serializer.deserialize(dto, {
      ignoreFromTarget: ['id', 'created_at', 'updated_at'],
    });

    const result: DealerModel = await this._service.create(model);
    return this._serializer.serialize(result);
  }
}
