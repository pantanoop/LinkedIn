import { Module } from '@nestjs/common';
import { AddPostService } from './addPost/addPost.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../domain/entities/post.entity';
import { AddPostController } from './addPost/addPost.controller';
import { FetchPostController } from './fetch_post/fetch_post.controller';
import { JwtModule } from '@nestjs/jwt';
import { FetchPostService } from '../post/fetch_post/fetch_post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
  ],
  controllers: [AddPostController, FetchPostController],
  providers: [AddPostService, FetchPostService],
})
export class PostModule {}
