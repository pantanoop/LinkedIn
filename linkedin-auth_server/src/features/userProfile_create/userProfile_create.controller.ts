import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserProfileCreateService } from './userProfile_create.service';
import type { Request } from 'express';

@Controller('user/createProfile')
export class UserProfileCreateController {
  constructor(
    private readonly userProfileCreateService: UserProfileCreateService,
  ) {}

  @Post()
  async create_userProfile(
    @Req() req: Request,
    @Body('profileName') profileName: string,
  ) {
    console.log('controller hitted', profileName);

    const idToken = req.cookies['access_token'];

    if (!idToken) {
      throw new UnauthorizedException('Token missing');
    }

    const userProfileName =
      await this.userProfileCreateService.create_userProfile(
        idToken,
        profileName,
      );

    return { profileName: userProfileName };
  }
}
