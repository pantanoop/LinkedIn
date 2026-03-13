import { Controller, Post, Param, UseGuards, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';
import { RepostService } from './repost.service';

@Controller('posts/repost')
export class RepostController {
  constructor(private readonly repostService: RepostService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async repost(
    @Param('postId') postId: string,
    @Body('userName') userName: string,
    @Req() req,
  ) {
    const userId = req.user.sub;

    return this.repostService.repost(postId, userId, userName);
  }
}
