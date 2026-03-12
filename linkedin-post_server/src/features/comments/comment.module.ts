import { Module } from '@nestjs/common';
import { AddCommentService } from './addComment/addComment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../../domain/entities/comment.entity';
import { AddCommentController } from './addComment/addComment.controller';
import { FetchCommentsController } from './fetch_comments/fetch_comments.controller';
import { JwtModule } from '@nestjs/jwt';
import { FetchCommentsService } from './fetch_comments/fetch_comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
  ],
  controllers: [AddCommentController, FetchCommentsController],
  providers: [AddCommentService, FetchCommentsService],
})
export class CommentModule {}
