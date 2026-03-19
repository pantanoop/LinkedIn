import { Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('auth/logout')
export class SignOutController {
  @Post()
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });

    res.clearCookie('refresh_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });

    return {
      message: 'Logged out successfully',
    };
  }
}
