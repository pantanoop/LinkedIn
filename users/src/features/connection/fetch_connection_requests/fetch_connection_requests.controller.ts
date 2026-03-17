import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { FetchConnectionRequestService } from './fetch_connection_requests.service';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('connections/invitations')
export class FetchConnectionRequestController {
  constructor(
    private readonly connectionService: FetchConnectionRequestService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async getInvitations(@Body() body: { currentUserId: number }) {
    console.log('get inv dto hit', body.currentUserId);
    return this.connectionService.getInvitations(body.currentUserId);
  }
}
