import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Post } from '../../../domain/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AddPostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async addPost(data: any, files: Express.Multer.File[]) {
    const { userid, description, userName, profileUrl, userTitle } = data;
    const mediaUrls =
      files?.map((file) => `http://localhost:3001/uploads/${file.filename}`) ||
      [];

    const newPost = await this.postRepo.create({
      postId: uuidv4(),
      userid,
      userName,
      profileUrl,
      userTitle,
      description,
      mediaUrls,
      postType: 'public',
    });

    await this.postRepo.save(newPost);
    return newPost;
  }
}
