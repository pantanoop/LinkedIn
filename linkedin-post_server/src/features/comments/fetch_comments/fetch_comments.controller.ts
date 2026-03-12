import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';
import { FetchCommentsService } from './fetch_comments.service';

@Controller('comments/fetch')
export class FetchCommentsController {
  constructor(private readonly fetchCommentsService: FetchCommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':postId')
  async getComments(@Param('postId') postId: string) {
    return this.fetchCommentsService.getComments(postId);
  }
}
