import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AddPostService } from './addPost.service';

import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('posts/add')
export class AddPostController {
  constructor(private readonly addPostService: AddPostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addPost(@Body() data: any) {
    return this.addPostService.addPost(data);
  }
}
