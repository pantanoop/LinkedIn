import { Injectable } from '@nestjs/common';
import { Comment } from '../../../domain/entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FetchCommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}
  async getComments(postId: string) {
    const comments = await this.commentRepo.find({
      where: { postId },
      order: { createdAt: 'ASC' },
    });

    return comments;
  }
}
