import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firebaseAdmin } from '../../../infrastructure/firebase/firebase_admin';
import { UserAccount } from '../../../domain/entities/user_account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegisterUserService {
  constructor(
    @InjectRepository(UserAccount)
    private readonly userRepository: Repository<UserAccount>,
    private readonly jwtService: JwtService,
  ) {}

  async register_user(idToken: string) {
    let decoded;

    try {
      decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
    } catch {
      throw new UnauthorizedException('Invalid Firebase token');
    }

    const user = await this.userRepository.findOne({
      where: { email: decoded.email },
    });

    if (user) {
      throw new UnauthorizedException('User Already exists');
    }
    const displayName =
      decoded.name === undefined ? decoded.email.split('@')[0] : decoded.name;

    const newUser = this.userRepository.create({
      userid: uuidv4(),
      displayName,
      email: decoded.email,
    });

    await this.userRepository.save(newUser);

    const payload = {
      sub: newUser.userid,
      email: newUser.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    return {
      user: newUser,
      accessToken,
      refreshToken,
    };
  }
}
