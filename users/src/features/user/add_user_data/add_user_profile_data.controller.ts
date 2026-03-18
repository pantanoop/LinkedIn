import {
  Controller,
  Patch,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AddUserDataService } from './add_user_profile_data.service';

@Controller('users/add/profile')
export class AddUserDataController {
  constructor(private readonly userService: AddUserDataService) {}

  @Patch()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePicture', maxCount: 1 },
      { name: 'coverPicture', maxCount: 1 },
    ]),
  )
  async completeProfile(
    @Body() data: any,
    @UploadedFiles()
    files: {
      profilePicture?: Express.Multer.File[];
      coverPicture?: Express.Multer.File[];
    },
  ) {
    return this.userService.completeProfile(data, files);
  }
}
