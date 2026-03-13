import { Injectable } from '@nestjs/common';
import { Post } from '../../../domain/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repost } from '../../../domain/entities/repost.entity';

@Injectable()
export class FetchPostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    @InjectRepository(Repost)
    private readonly repostRepo: Repository<Repost>,
  ) {}
  // async get_posts() {
  //   const posts = await this.postRepo
  //     .createQueryBuilder('post')
  //     .leftJoin('post.likes', 'like')
  //     .loadRelationCountAndMap('post.likeCount', 'post.likes')
  //     .orderBy('post.postedOn', 'DESC')
  //     .getMany();
  //   return posts;
  // }

  // async get_posts() {
  //   const posts = await this.postRepo
  //     .createQueryBuilder('post')
  //     .leftJoinAndSelect('post.likes', 'like') // IMPORTANT
  //     .loadRelationCountAndMap('post.likeCount', 'post.likes')
  //     .orderBy('post.postedOn', 'DESC')
  //     .getMany();

  //   return posts;
  // }

  async get_posts(userId: string) {
    const posts = await this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.likes', 'like')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .getMany();

    const reposts = await this.repostRepo
      .createQueryBuilder('repost')
      .leftJoinAndSelect('repost.post', 'post')
      .leftJoinAndSelect('post.likes', 'like')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .getMany();

    const normalPosts = posts.map((post) => ({
      ...post,
      type: 'post',
      likedByUser: post.likes.some((l) => l.userId === userId),
      feedTime: post.postedOn,
    }));

    const repostFeed = reposts.map((r) => ({
      ...r.post,
      type: 'repost',
      repostUser: r.userName,
      repostUserId: r.userid,
      repostedOn: r.repostedOn,
      likedByUser: r.post.likes.some((l) => l.userId === userId),
      feedTime: r.repostedOn,
    }));

    const feed = [...normalPosts, ...repostFeed].sort(
      (a, b) => new Date(b.feedTime).getTime() - new Date(a.feedTime).getTime(),
    );

    return feed;
  }
}
