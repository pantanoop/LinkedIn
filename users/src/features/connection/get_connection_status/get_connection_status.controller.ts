import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { GetConnectionStatusService } from './get_connection_status.service';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('connections/status')
export class GetConnectionStatusController {
  constructor(private readonly connectionService: GetConnectionStatusService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async getConnectionStatuses(@Body() body: { currentUserId: number }) {
    return this.connectionService.getConnectionStatuses(body.currentUserId);
  }
}
