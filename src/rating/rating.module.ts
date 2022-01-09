import { Logger, Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rate, RatingSchema } from './rating.schema';
import { RatingDao } from './dao/rating.dao';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rate.name, schema: RatingSchema }]),
  ],
  providers: [RatingService, RatingDao, Logger],
  controllers: [RatingController],
})
export class RatingModule {}
