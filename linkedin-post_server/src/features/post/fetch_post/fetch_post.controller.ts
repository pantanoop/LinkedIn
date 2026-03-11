import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';
import { FetchPostService } from './fetch_post.service';

@Controller('posts/fetch')
export class FetchPostController {
  constructor(private readonly fetchPostService: FetchPostService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async get_posts() {
    return await this.fetchPostService.get_posts();
  }
}
