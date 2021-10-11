import { FilterQuery, Model } from 'mongoose';

export class BaseRepository<Document, Schema> {
  constructor(protected readonly _model: Model<Document>) {}

  async create(item: Schema): Promise<Document> {
    return this._model.create(item);
  }

  async find(): Promise<Document[]> {
    return this._model.find();
  }

  async findOne(filter: FilterQuery<Document>): Promise<Document> {
    return this._model.findOne(filter);
  }

  async updateOne(
    filter: FilterQuery<Document>,
    item: Schema,
  ): Promise<Document> {
    return this._model.findOneAndUpdate(filter, item, {
      new: true,
    });
  }

  async deleteOne(filter: FilterQuery<Document>): Promise<Document> {
    return this._model.findOneAndDelete(filter);
  }

  async checkExists(filter: FilterQuery<Document>): Promise<boolean> {
    const result = await this._model.findOne(filter);
    return !!result;
  }
}
