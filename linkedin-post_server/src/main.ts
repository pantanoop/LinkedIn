import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use('/uploads', express.static('uploads'));
  app.enableCors({ origin: '*' });
  await app.listen(process.env.PORT ?? 6000);
}
bootstrap();
