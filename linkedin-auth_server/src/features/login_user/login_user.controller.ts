import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { LoginUserService } from './login_user.service';

@Controller('auth/login')
export class LoginUserController {
  constructor(private readonly loginUserService: LoginUserService) {}

  @Post()
  async login_user(
    @Body('idToken') idToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!idToken) {
      throw new UnauthorizedException('Token missing');
    }
    const user = await this.loginUserService.login_user(idToken);
    res.cookie('access_token', idToken, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return user;
  }
}
