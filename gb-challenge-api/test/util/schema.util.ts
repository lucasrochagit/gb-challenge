import { Model, Document } from 'mongoose';

export async function create(
  model: Model<Document>,
  data: any,
): Promise<Document> {
  return model.create(data);
}

export async function find(
  model: Model<Document>,
  filter: any,
): Promise<Document[]> {
  return model.find(filter);
}

export async function findOne(
  model: Model<Document>,
  filter: any,
): Promise<Document> {
  return model.findOne(filter);
}

export async function deleteOne(
  model: Model<Document>,
  filter: any,
): Promise<void> {
  await model.deleteOne(filter);
}

export async function deleteMany(model: Model<Document>): Promise<void> {
  await model.deleteMany({});
}

export async function cleanCollections(
  models: Model<Document>[],
): Promise<void> {
  await Promise.all(models.map((model) => deleteMany(model)));
}
