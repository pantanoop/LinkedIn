// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { User } from '../../../domain/entities/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export class UserProfileCreateService {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   async create_userProfile(data: any) {
//     const { userid, profileName } = data;
//     const existing = await this.userRepository.findOne({
//       where: { userid },
//     });

//     if (existing) {
//       throw new UnauthorizedException(
//         'User Already exists with different credentials',
//       );
//     }
//     const newUser = this.userRepository.create({
//       userid,
//       profileName,
//     });

//     await this.userRepository.save(newUser);

//     return newUser.profileName;
//   }
// }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserProfileCreateService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create_userProfile(data: any) {
    const { userid, profileName } = data;

    const existing = await this.userRepository.findOne({
      where: { userid },
    });

    if (existing) {
      throw new UnauthorizedException(
        'User Already exists with different credentials',
      );
    }

    const newUser = this.userRepository.create({
      userid,
      profileName,

      userTitle: 'Software Developer',
      about: 'Building cool stuff on LinkedIn clone',
      profileUrl: 'https://i.pravatar.cc/150?img=12',
      coverUrl: 'https://i.pravatar.cc/150?img=12',

      followersCount: 0,
      followingCount: 0,
      connectionsCount: 0,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }
}
