import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AcceptConnectionService } from './accept_connection.service';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('connections/accept')
export class AcceptConnectionController {
  constructor(private readonly connectionService: AcceptConnectionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async acceptConnection(@Body() data: any) {
    return this.connectionService.acceptConnection(data);
  }
}
