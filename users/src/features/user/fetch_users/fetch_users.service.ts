import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class FetchUsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async fetchUsers(page: number, limit: number, currentUserId?: string) {
    const whereCondition = currentUserId ? { userid: Not(currentUserId) } : {};

    const [users, total] = await this.userRepository.findAndCount({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
    });

    return {
      data: users,
      total,
      page,
      limit,
    };
  }
}
