import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RateDocument = Rating & Document;

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
export class Rating {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: Number,
    required: true,
    validate: function (r) {
      return r >= 1 && r <= 5;
    },
  })
  price: number;

  @Prop({
    type: Number,
    required: true,
    validate: function (r) {
      return r >= 1 && r <= 5;
    },
  })
  time: number;

  @Prop({
    type: Number,
    required: true,
    validate: function (r) {
      return r >= 1 && r <= 5;
    },
  })
  quality: number;

  @Prop({
    type: Number,
    required: true,
    validate: function (r) {
      return r >= 1 && r <= 5;
    },
  })
  personality: number;

  @Prop({
    type: String,
    required: false,
    default: '',
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
    required: false,
    set: () => new Date().toISOString(),
    default: new Date().toISOString(),
  })
  date: string;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  anonymous: boolean;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
