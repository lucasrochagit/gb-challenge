import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DealerDocument = Dealer & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
})
export class Dealer {
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
