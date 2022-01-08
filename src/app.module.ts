import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RateModule } from './rate/rate.module';
import * as Config from 'config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    RateModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI', Config.get('mongodb.uri')),
      }),
    }),
  ],

  controllers: [],
  providers: [],
})

export class AppModule {}
