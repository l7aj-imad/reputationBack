import { Logger, Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from './rating.schema';
import { RatingDao } from './dao/rating.dao';
import { ProfessionalPartnerAPI } from '../services/professional-partner.api';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }]),
  ],
  providers: [
    ProfessionalPartnerAPI,
    RatingService,
    RatingDao,
    ConfigService,
    Logger,
  ],
  controllers: [RatingController],
})
export class RatingModule {}
