import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingModule } from './rating/rating.module';
import * as Config from 'config';

@Module({
  imports: [
    RatingModule,
    MongooseModule.forRoot(AppModule.getURI(), AppModule.getOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  public static getURI(): string {
    return (
      Config.get<string>('mongodb.uri_prefix') +
      (Config.get<string>('mongodb.login')
        ? Config.get<string>('mongodb.login') +
          ':' +
          Config.get<string>('mongodb.password') +
          '@'
        : '') +
      Config.get<string>('mongodb.host') +
      ':' +
      Config.get<string>('mongodb.port')
    );
  }

  public static getOptions(): any {
    return Config.get<string>('mongodb.authdb')
      ? {
          dbName: Config.get<string>('mongodb.database'),
          authSource: Config.get<string>('mongodb.authdb'),
        }
      : {
          dbName: Config.get<string>('mongodb.database'),
        };
  }
}
