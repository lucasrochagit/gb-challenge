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
import { SaleModel } from '../../business/model/sale.model';
import { SaleService } from '../../business/service/sale.service';
import {
  CreateSaleDTO,
  SaleDTO,
  MethodByIdSaleDTO,
  UpdateSaleDTO,
} from '../dto/sale.dto';
import { SaleDTOMapper } from '../mapper/sale.dto.mapper';

@Controller('sales')
export class SaleController {
  constructor(
    private readonly _service: SaleService,
    private readonly _mapper: SaleDTOMapper,
  ) {}

  @Post()
  async create(@Body() dto: CreateSaleDTO): Promise<SaleDTO> {
    const model: SaleModel = this._mapper.deserialize(dto);
    const result: SaleModel = await this._service.create(model);
    return this._mapper.serialize(result);
  }

  @Get()
  async find(): Promise<SaleDTO[]> {
    const result: SaleModel[] = await this._service.find();
    return result.map((item: SaleModel) => this._mapper.serialize(item));
  }

  @Get(':sale_id')
  async findById(@Param() params: MethodByIdSaleDTO): Promise<SaleDTO> {
    const result: SaleModel = await this._service.findById(params.sale_id);
    return this._mapper.serialize(result);
  }

  @Put(':sale_id')
  async updateById(
    @Param() params: MethodByIdSaleDTO,
    @Body() dto: UpdateSaleDTO,
  ): Promise<SaleDTO> {
    const model: SaleModel = this._mapper.deserialize(dto);
    const result: SaleModel = await this._service.updateById(
      params.sale_id,
      model,
    );
    return this._mapper.serialize(result);
  }

  @Delete(':sale_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param() params: MethodByIdSaleDTO): Promise<void> {
    return this._service.deleteById(params.sale_id);
  }
}
