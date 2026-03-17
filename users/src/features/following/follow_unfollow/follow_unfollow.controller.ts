import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { FollowService } from './follow_unfollow.service';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('users/follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async toggleFollow(@Body() data: any) {
    return this.followService.toggleFollow(data);
  }
}
