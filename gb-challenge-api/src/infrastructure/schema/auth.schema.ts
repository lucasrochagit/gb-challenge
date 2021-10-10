import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ReadOnlySchema } from './readonly.schema';

export type AuthDocument = Auth & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
})
export class Auth extends ReadOnlySchema {
  @Prop()
  access_token: string;

  @Prop({ default: 'Bearer' })
  token_type: string;

  @Prop()
  refresh_token: string;

  @Prop()
  expires_in: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Dealer' })
  owner: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
