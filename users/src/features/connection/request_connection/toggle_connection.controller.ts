import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ToggleConnectionService } from './toggle_connection.service';
import { JwtAuthGuard } from '../../../infrastructure/auth_guard/jwt_auth_guard';

@Controller('connections/toggle')
export class ToggleConnectionController {
  constructor(private readonly connectionService: ToggleConnectionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async toggleConnection(@Body() data: any) {
    console.log(data, 'controller toggle conn');
    return this.connectionService.toggleConnection(data);
  }
}
