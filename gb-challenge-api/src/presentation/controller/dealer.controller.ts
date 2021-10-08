import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DealerModel } from '../../business/model/dealer.model';
import { DealerService } from '../../business/service/dealer.service';
import {
  CreateDealerDTO,
  DealerDTO,
  MethodByIdDealerDTO,
  UpdateDealerDTO,
} from '../dto/dealer.dto';
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

  @Get()
  async find(): Promise<DealerDTO[]> {
    const result: DealerModel[] = await this._service.find();
    return result.map((item: DealerModel) => this._mapper.serialize(item));
  }

  @Get(':dealer_id')
  async findById(@Param() params: MethodByIdDealerDTO): Promise<DealerDTO> {
    const result: DealerModel = await this._service.findById(params.dealer_id);
    return this._mapper.serialize(result);
  }

  @Put(':dealer_id')
  async update(
    @Param() params: MethodByIdDealerDTO,
    @Body() dto: UpdateDealerDTO,
  ): Promise<DealerDTO> {
    const model: DealerModel = this._mapper.deserialize(dto);
    const result: DealerModel = await this._service.update(
      params.dealer_id,
      model,
    );
    return this._mapper.serialize(result);
  }

  @Delete(':dealer_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param() params: MethodByIdDealerDTO): Promise<void> {
    return this._service.deleteById(params.dealer_id);
  }
}
