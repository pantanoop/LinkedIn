import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Education } from '../../../domain/entities/education.entity';

@Injectable()
export class AddUserEducationDataService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Education)
    private readonly educationRepo: Repository<Education>,
  ) {}

  async addEducation(body: any) {
    const {
      currentUserId,
      institutionName,
      degree,
      fieldOfStudy,
      startMonth,
      startYear,
      endMonth,
      endYear,
    } = body;

    const user = await this.userRepo.findOne({
      where: { userid: currentUserId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const education = this.educationRepo.create({
      institutionName,
      degree,
      fieldOfStudy,
      startMonth,
      startYear,
      endMonth,
      endYear,
      user,
    });

    return await this.educationRepo.save(education);
  }
}
