// follow.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Follow } from '../../../domain/entities/follow.entity';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private followRepo: Repository<Follow>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    private dataSource: DataSource,
  ) {}

  async toggleFollow(data: any) {
    const { followerId, followingId } = data;
    if (followerId === followingId) {
      throw new BadRequestException('You cannot follow yourself');
    }

    const [follower, following] = await Promise.all([
      this.userRepo.findOne({ where: { id: followerId } }),
      this.userRepo.findOne({ where: { id: followingId } }),
    ]);

    if (!follower || !following) {
      throw new NotFoundException('User not found');
    }

    const existingFollow = await this.followRepo.findOne({
      where: {
        follower: { id: followerId },
        following: { id: followingId },
      },
    });

    if (existingFollow) {
      return this.dataSource.transaction(async (manager) => {
        await manager.delete(Follow, {
          follower: { id: followerId },
          following: { id: followingId },
        });

        await manager.decrement(User, { id: followerId }, 'followingCount', 1);
        await manager.decrement(User, { id: followingId }, 'followersCount', 1);

        return {
          message: 'Unfollowed successfully',
          isFollowing: false,
          followingId,
        };
      });
    }
    return this.dataSource.transaction(async (manager) => {
      const follow = manager.create(Follow, {
        follower,
        following,
      });

      await manager.save(follow);

      await manager.increment(User, { id: followerId }, 'followingCount', 1);
      await manager.increment(User, { id: followingId }, 'followersCount', 1);

      return {
        message: 'Followed successfully',
        isFollowing: true,
        followingId,
      };
    });
  }
}
