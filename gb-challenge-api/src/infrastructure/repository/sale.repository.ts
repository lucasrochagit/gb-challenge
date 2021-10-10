import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale, SaleDocument } from '../schema/sale.schema';
import { BaseRepository } from './base/repository.base';

@Injectable()
export class SaleRepository extends BaseRepository<SaleDocument, Sale> {
  constructor(
    @InjectModel(Sale.name) protected readonly _model: Model<SaleDocument>,
  ) {
    super(_model);
  }
}
