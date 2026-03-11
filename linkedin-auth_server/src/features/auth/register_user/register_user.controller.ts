import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { RegisterUserService } from './register_user.service';

@Controller('auth/register')
export class RegisterUserController {
  constructor(private readonly registerUserService: RegisterUserService) {}

  @Post()
  async register_user(
    @Body('idToken') idToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!idToken) {
      throw new UnauthorizedException('Token missing');
    }

    const { user, accessToken, refreshToken } =
      await this.registerUserService.register_user(idToken);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return user;
  }
}
