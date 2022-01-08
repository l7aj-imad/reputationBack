import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RateDocument = Rate & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      // delete obsolete data
      delete ret._id;
    },
  },
  versionKey: false,
})
export class Rate {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Number,
    required: true,
  })
  time: number;

  @Prop({
    type: Number,
    required: true,
  })
  quality: number;

  @Prop({
    type: Number,
    required: true,
  })
  personality: number;

  @Prop({
    type: String,
    required: true,
  })
  comment: string;

  @Prop({
    type: String,
    required: true,
  })
  clientId: string;

  @Prop({
    type: String,
    required: true,
  })
  professionalId: string;

  @Prop({
    type: Date,
    required: true,
  })
  date: string;

  @Prop({
    type: Boolean,
    required: true,
  })
  anonymous: boolean;
}

export const RateSchema = SchemaFactory.createForClass(Rate);
