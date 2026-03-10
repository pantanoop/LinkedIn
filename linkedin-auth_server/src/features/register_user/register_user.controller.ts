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
    const user = await this.registerUserService.register_user(idToken);
    res.cookie('access_token', idToken, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return user;
  }
}
