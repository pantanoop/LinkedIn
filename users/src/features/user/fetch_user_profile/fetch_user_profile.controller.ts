import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { FetchUserProfileService } from './fetch_user_profile.service';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('users/getprofile')
export class FetchUserProfileController {
  constructor(private readonly userService: FetchUserProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async fetchUser(@Body() body: any) {
    return this.userService.fetchUser(body.userId);
  }
}
