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

  async completeProfile(
    data: any,
    files?: {
      profilePicture?: Express.Multer.File[];
      coverPicture?: Express.Multer.File[];
    },
  ) {
    const { currentUserId, firstName, lastName, headline, about } = data;
    const user = await this.userRepo.findOne({
      where: { userid: currentUserId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.profileName = `${firstName} ${lastName}`;

    user.userTitle = headline || '';
    user.about = about || '';

    if (files?.profilePicture?.[0]) {
      user.profileUrl = `http://localhost:3002/uploads/${files.profilePicture[0].filename}`;
    }

    if (files?.coverPicture?.[0]) {
      user.coverUrl = `http://localhost:3002/uploads/${files.coverPicture[0].filename}`;
    }

    const savedUser = await this.userRepo.save(user);
    return {
      message: 'Profile completed successfully',
      user: savedUser,
    };
  }
}
