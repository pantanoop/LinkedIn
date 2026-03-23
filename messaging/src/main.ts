import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use('/uploads', express.static('uploads'));

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3003);
}

bootstrap();
