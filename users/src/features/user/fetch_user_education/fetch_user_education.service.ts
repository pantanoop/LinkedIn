import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../domain/entities/user.entity';
import { Education } from '../../../domain/entities/education.entity';

@Injectable()
export class GetUserEducationDataService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Education)
    private readonly educationRepo: Repository<Education>,
  ) {}

  async getEducationByUser(userId: string) {
    const user = await this.userRepo.findOne({
      where: { userid: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const educations = await this.educationRepo.find({
      where: { user: { id: user.id } },
      order: { id: 'DESC' },
    });

    return educations;
  }
}
