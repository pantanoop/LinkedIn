import { Module } from '@nestjs/common';
import { AddPostService } from './addPost.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../domain/entities/post.entity';
import { AddPostController } from './addPost.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [AddPostController],
  providers: [AddPostService],
})
export class AddPostModule {}
