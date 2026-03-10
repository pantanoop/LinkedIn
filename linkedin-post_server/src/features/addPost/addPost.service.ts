import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firebaseAdmin } from '../../infrastructure/firebase/firebase_admin';
import { Post } from '../../domain/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AddPostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async addPost(idToken: string, data: any, files: Express.Multer.File[]) {
    let decoded;
    const { description } = data;
    const imageUrls =
      files?.map((file) => `http://localhost:6000/uploads/${file.filename}`) ||
      [];
    try {
      decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
    } catch {
      throw new UnauthorizedException('Invalid Firebase token');
    }

    const newPost = await this.postRepo.create({
      postId: uuidv4(),
      userid: decoded.uid,
      description,
      imageUrls,
      postType: 'private',
    });

    await this.postRepo.save(newPost);
    return newPost;
  }
}
