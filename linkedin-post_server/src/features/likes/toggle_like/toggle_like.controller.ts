import { Body, Controller, Post, Param, UseGuards } from '@nestjs/common';
import { ToggleLikeService } from './toggle_like.service';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('posts/like')
export class ToggleLikeController {
  constructor(private readonly toggleLikeService: ToggleLikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId/toggle-like')
  async toggleLike(
    @Param('postId') postId: string,
    @Body('userId') userId: string,
  ) {
    return this.toggleLikeService.toggleLike(postId, userId);
  }
}
