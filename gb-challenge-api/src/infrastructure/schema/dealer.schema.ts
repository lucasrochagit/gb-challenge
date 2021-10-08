import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ReadOnlySchema } from './readonly.schema';

export type DealerDocument = Dealer & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  toJSON: ReadOnlySchema.toJSON()
})
export class Dealer extends ReadOnlySchema {
  @Prop()
  full_name: string;

  @Prop()
  cpf: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const DealerSchema = SchemaFactory.createForClass(Dealer);
