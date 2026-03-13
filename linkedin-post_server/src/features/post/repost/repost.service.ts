import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { Repost } from '../../../domain/entities/repost.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RepostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,

    @InjectRepository(Repost)
    private readonly repostRepo: Repository<Repost>,
  ) {}

  async repost(postId: string, userId: string, userName: string) {
    const originalPost = await this.postRepo.findOne({
      where: { postId },
    });

    if (!originalPost) {
      throw new BadRequestException('Post not found');
    }

    if (originalPost.userid === userId) {
      throw new BadRequestException('You cannot repost your own post');
    }

    const alreadyReposted = await this.repostRepo.findOne({
      where: {
        postId,
        userid: userId,
      },
    });

    if (alreadyReposted) {
      throw new BadRequestException('You already reposted this post');
    }

    const repost = this.repostRepo.create({
      postId,
      userid: userId,
      userName,
      repostedOn: new Date(),
    });

    return this.repostRepo.save(repost);
  }
}
