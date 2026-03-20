import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AddUserEducationDataService } from './add_user_education_data.service';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('users/add/education')
export class AddUserEducationDataController {
  constructor(private readonly educationService: AddUserEducationDataService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addEducation(@Body() body: any) {
    return this.educationService.addEducation(body);
  }
}
