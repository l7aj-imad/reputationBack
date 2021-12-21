import {Logger, Module} from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Rate, RateSchema} from "./rate.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rate.name, schema: RateSchema }]),
  ],
  providers: [RateService],
  controllers: [RateController, Logger]
})
export class RateModule {}
