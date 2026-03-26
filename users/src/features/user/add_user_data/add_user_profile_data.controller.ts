import {
  Controller,
  Patch,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AddUserDataService } from './add_user_profile_data.service';
@Controller('users/add/profile')
export class AddUserDataController {
  constructor(private readonly userService: AddUserDataService) {}

  @Patch()
  async completeProfile(@Body() data: any) {
    return this.userService.completeProfile(data);
  }
}
