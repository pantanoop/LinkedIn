import { Module } from '@nestjs/common';
import { AddPostService } from './addPost/addPost.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../domain/entities/post.entity';
import { Repost } from '../../domain/entities/repost.entity';

import { AddPostController } from './addPost/addPost.controller';
import { FetchPostController } from './fetch_post/fetch_post.controller';
import { JwtModule } from '@nestjs/jwt';
import { FetchPostService } from '../post/fetch_post/fetch_post.service';
import { RepostController } from '../post/repost/repost.controller';
import { RepostService } from '../post/repost/repost.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Repost]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
  ],
  controllers: [AddPostController, FetchPostController, RepostController],
  providers: [AddPostService, FetchPostService, RepostService],
})
export class PostModule {}
