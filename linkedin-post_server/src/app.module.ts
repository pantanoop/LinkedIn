import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/database/typeorm.config';
import { PostModule } from './features/post/post.module';
import { JwtModule } from '@nestjs/jwt';
import { LikeModule } from './features/likes/like.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PostModule,
    LikeModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
