import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';

import { AddPostService } from './addPost.service';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { postImageStorage } from '../../../infrastructure/multer/multer.config';

import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('posts/add')
export class AddPostController {
  constructor(private readonly addPostService: AddPostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: postImageStorage,
    }),
  )
  async addPost(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: any,
  ) {
    return this.addPostService.addPost(data, files);
  }
}
