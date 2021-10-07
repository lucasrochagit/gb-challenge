import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Dealer, DealerDocument } from '../schema/dealer.schema';

@Injectable()
export class DealerRepository {
  constructor(
    @InjectModel(Dealer.name) private readonly _model: Model<DealerDocument>,
  ) {}

  async create(dealer: Dealer): Promise<Dealer> {
    return new Promise<Dealer>(async (resolve, reject) => {
      try {
        const result: DealerDocument = await this._model.create(dealer);
        return resolve(result.toObject());
      } catch (err) {
        return reject(err);
      }
    });
  }

  async checkExists(filter: FilterQuery<DealerDocument>): Promise<boolean> {
    const result = await this._model.findOne(filter);
    return !!result;
  }
}
