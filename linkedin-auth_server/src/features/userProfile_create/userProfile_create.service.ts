import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firebaseAdmin } from '../../infrastructure/firebase/firebase_admin';
import { User } from '../../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserProfileCreateService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create_userProfile(idToken: string, profileName: string) {
    console.log('service hitted profile creation', idToken, profileName);
    let decoded;
    try {
      decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
    } catch {
      throw new UnauthorizedException('Invalid Firebase token');
    }

    const existing = await this.userRepository.findOne({
      where: { userid: decoded.uid },
    });

    if (existing) {
      throw new UnauthorizedException(
        'User Already exists with different credentials',
      );
    }
    console.log('decoded', decoded);
    const newUser = this.userRepository.create({
      userid: decoded.uid,
      profileName,
    });

    await this.userRepository.save(newUser);

    return newUser.profileName;
  }
}
