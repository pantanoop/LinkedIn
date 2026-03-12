import { Body, Controller, Post, UseGuards, Param } from '@nestjs/common';

import { AddCommentService } from './addComment.service';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('posts/comments')
export class AddCommentController {
  constructor(private readonly commentService: AddCommentService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async addComment(@Param('postId') postId: string, @Body() body: any) {
    return this.commentService.addComment(postId, body);
  }
}
