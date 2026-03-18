import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserProfileCreateService } from './userProfile_create.service';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('user/createProfile')
export class UserProfileCreateController {
  constructor(
    private readonly userProfileCreateService: UserProfileCreateService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create_userProfile(@Body() data: any) {
    return await this.userProfileCreateService.create_userProfile(data);
  }
}
