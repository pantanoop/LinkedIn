import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';

import { AddPostService } from './addPost.service';

import { postMediaMulterConfig } from '../../../infrastructure/multer/multer.config';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('posts/add')
export class AddPostController {
  constructor(private readonly addPostService: AddPostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  @UseInterceptors(FilesInterceptor('files', 5, postMediaMulterConfig))
  async addPost(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: any,
  ) {
    return this.addPostService.addPost(data, files);
  }
}
