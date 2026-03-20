import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetUserEducationDataService } from './fetch_user_education.service';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('education/user/:userId')
export class GetUserEducationDataController {
  constructor(private readonly educationService: GetUserEducationDataService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getEducation(@Param('userId') userId: string) {
    return this.educationService.getEducationByUser(userId);
  }
}
