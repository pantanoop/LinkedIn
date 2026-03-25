import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class FetchUserProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async fetchUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: { userid: userId },
    });
    if (!user) {
      return {};
    }
    return user;
  }
}
