import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firebaseAdmin } from '../../../infrastructure/firebase/firebase_admin';
import { UserAccount } from '../../../domain/entities/user_account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUserService {
  constructor(
    @InjectRepository(UserAccount)
    private readonly userRepository: Repository<UserAccount>,
    private readonly jwtService: JwtService,
  ) {}

  async login_user(idToken: string) {
    let decoded;

    try {
      decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
    } catch {
      throw new UnauthorizedException('Invalid Firebase token');
    }

    let user = await this.userRepository.findOne({
      where: { email: decoded.email },
    });

    if (!user) {
      user = this.userRepository.create({
        userid: uuidv4(),
        displayName: decoded.name ?? decoded.email.split('@')[0],
        email: decoded.email,
      });

      await this.userRepository.save(user);
    }

    const payload = {
      sub: user.userid,
      email: user.email,
    };

    // const accessToken = await this.jwtService.signAsync(payload, {
    //   expiresIn: '15m',
    // });
    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
