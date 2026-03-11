import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Like } from '../../../domain/entities/like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ToggleLikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepo: Repository<Like>,
  ) {}

  async toggleLike(postId: string, userId: string) {
    const existing = await this.likeRepo.findOne({
      where: { postId, userId },
    });

    if (existing) {
      await this.likeRepo.delete({ postId, userId });
      return { liked: false };
    }

    await this.likeRepo.save({
      postId,
      userId,
    });

    return { liked: true };
  }
}
