import {Logger, Module} from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Rate, RateSchema} from "./rate.schema";
import { RateDao } from './dao/Rate.dao';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rate.name, schema: RateSchema }]),
  ],
  providers: [RateService, RateDao, Logger],
  controllers: [RateController]
})
export class RateModule {}
