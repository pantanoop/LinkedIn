import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';
import { FetchPostService } from './fetch_post.service';

@Controller('posts/fetch')
export class FetchPostController {
  constructor(private readonly fetchPostService: FetchPostService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPosts(@Req() req) {
    const userId = req.user.sub;
    console.log(userId);

    return this.fetchPostService.get_posts(userId);
  }
}
