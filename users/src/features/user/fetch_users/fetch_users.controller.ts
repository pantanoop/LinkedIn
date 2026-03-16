import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { FetchUsersService } from './fetch_users.service';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('users')
export class FetchUsersController {
  constructor(private readonly fetchUsersService: FetchUsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('fetch')
  async fetchUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 6,
    @Req() req,
  ) {
    const userId = req.user.sub;
    return this.fetchUsersService.fetchUsers(
      Number(page),
      Number(limit),
      userId,
    );
  }
}
