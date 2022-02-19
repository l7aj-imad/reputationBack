import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as Config from 'config';
import { SwaggerConfig } from './app.types';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap(swaggerConfig: SwaggerConfig) {
  Logger.log(`Running in ${process.env.NODE_ENV} mode`, 'bootstrap');

  // create NestJS application
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  // enable CORS for NG Application's calls
  await app.enableCors({ origin: config.get('server.cors') });

  // use global pipe validation
  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // create swagger options
  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag(swaggerConfig.tag)
    .build();

  // create swagger document
  const linkDocument = SwaggerModule.createDocument(app, options, {
    include: [],
  });

  // setup swagger module
  SwaggerModule.setup(swaggerConfig.path, app, linkDocument);

  // launch server
  await app.listen(config.get('server.port'), config.get('server.host'));
  Logger.log(
    `Application served at http://${config.get('server.host')}:${config.get(
      'server.port',
    )}`,
    'bootstrap',
  );
}

bootstrap(Config.get<SwaggerConfig>('swagger'));
