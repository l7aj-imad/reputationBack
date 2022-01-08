import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RateModule } from './rate/rate.module';
import * as Config from 'config';

@Module({
  imports: [
    RateModule,
    MongooseModule.forRoot(
      Config.get<string>('mongodb.uri_prefix') +
        Config.get<string>('mongodb.login') +
        ':' +
        Config.get<string>('mongodb.password') +
        '@' +
        Config.get<string>('mongodb.host') +
        ':' +
        Config.get<string>('mongodb.port') +
        '/' +
        Config.get<string>('mongodb.database') +
        Config.get<string>('mongodb.uri_suffix') +
        Config.get<string>('mongodb.authdb'),
    ),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
