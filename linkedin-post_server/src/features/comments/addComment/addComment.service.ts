import { Injectable } from '@nestjs/common';
import { Comment } from '../../../domain/entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AddCommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  async addComment(postId: string, data: any) {
    const { content, userId, userName, profileUrl, parentId } = data;

    const comment = this.commentRepo.create({
      commentId: uuidv4(),
      postId,
      userId,
      userName,
      content,
      profileUrl,
      parentId: parentId || null,
      createdAt: new Date(),
    });

    return this.commentRepo.save(comment);
  }
}
