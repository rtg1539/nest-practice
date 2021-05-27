import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema({
  collection: 'ANSWER',
})
export class Cat {
  @Prop()
  TEST: string;

  @Prop({ type: Array })
  DATA;

  @Prop()
  UID: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
