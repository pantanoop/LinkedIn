import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/database/typeorm.config';
import { AddPostModule } from './features/addPost/addPost.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AddPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
