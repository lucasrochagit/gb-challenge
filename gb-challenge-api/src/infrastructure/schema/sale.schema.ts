import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ReadOnlySchema } from './readonly.schema';

export type SaleDocument = Sale & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
})
export class Sale extends ReadOnlySchema {
  @Prop()
  code: string;

  @Prop()
  value: number;

  @Prop()
  date: string;

  @Prop()
  status: string;

  @Prop()
  cashback_percentage: number;

  @Prop()
  cashback_value: number;

  @Prop()
  dealer_cpf: string;
}

const schema = SchemaFactory.createForClass(Sale);

export const SaleSchema = schema;
