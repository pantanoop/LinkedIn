import { Injectable } from '@nestjs/common';
import { Post } from '../../../domain/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FetchPostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}
  async get_posts() {
    const posts = await this.postRepo
      .createQueryBuilder('post')
      .leftJoin('post.likes', 'like')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .orderBy('post.postedOn', 'DESC')
      .getMany();
    return posts;
  }
}
