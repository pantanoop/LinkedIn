import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firebaseAdmin } from '../../infrastructure/firebase/firebase_admin';
import { UserAccount } from '../../domain/entities/user_account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RegisterUserService {
  constructor(
    @InjectRepository(UserAccount)
    private readonly userRepository: Repository<UserAccount>,
  ) {}

  async register_user(idToken: string) {
    let decoded;

    try {
      decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
    } catch {
      throw new UnauthorizedException('Invalid Firebase token');
    }

    const existing = await this.userRepository.findOne({
      where: { email: decoded.email },
    });

    if (existing) {
      throw new UnauthorizedException('User Already exists');
    }
    // console.log('decoded', decoded);
    const displayName =
      decoded.name === undefined ? decoded.email.split('@')[0] : decoded.name;

    // console.log('decoded displayname after setting ', displayName);
    const newUser = this.userRepository.create({
      userid: decoded.uid,
      displayName,
      email: decoded.email,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }
}
