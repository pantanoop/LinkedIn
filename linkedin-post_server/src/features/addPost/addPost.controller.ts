import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import type { Response } from 'express';
import { AddPostService } from './addPost.service';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { postImageStorage } from '../../infrastructure/multer/multer.config';
import { Express } from 'express';
import type { Request } from 'express';

@Controller('posts/add')
export class AddPostController {
  constructor(private readonly addPostService: AddPostService) {}

  @Post('')
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: postImageStorage,
    }),
  )
  async addPost(
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: any,
  ) {
    const idToken = req.cookies['access_token'];
    if (!idToken) {
      throw new UnauthorizedException('Token missing');
    }

    return this.addPostService.addPost(idToken, data, files);
  }
}
