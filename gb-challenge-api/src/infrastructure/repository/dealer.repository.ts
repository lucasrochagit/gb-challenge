import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dealer, DealerDocument } from '../schema/dealer.schema';
import { BaseRepository } from './base/repository.base';

@Injectable()
export class DealerRepository extends BaseRepository<DealerDocument, Dealer> {
  constructor(
    @InjectModel(Dealer.name) protected readonly _model: Model<DealerDocument>,
  ) {
    super(_model);
  }
}
