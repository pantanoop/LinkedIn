import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class AddUserDataService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async completeProfile(data: any) {
    const {
      currentUserId,
      firstName,
      lastName,
      headline,
      about,
      profileUrl,
      coverUrl,
    } = data;
    const user = await this.userRepo.findOne({
      where: { userid: currentUserId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.profileName = `${firstName} ${lastName}`;
    user.userTitle = headline || '';
    user.about = about || '';
    user.profileUrl = profileUrl || '';
    user.coverUrl = coverUrl || '';

    const savedUser = await this.userRepo.save(user);
    return {
      message: 'Profile completed successfully',
      user: savedUser,
    };
  }
}
