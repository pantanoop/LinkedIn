import { Module } from '@nestjs/common';
import { ToggleConnectionService } from './request_connection/toggle_connection.service';
import { AcceptConnectionService } from './accept_connection/accept_connection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { Connection } from '../../domain/entities/connection.entity';
import { ToggleConnectionController } from './request_connection/toggle_connection.controller';
import { AcceptConnectionController } from './accept_connection/accept_connection.controller';
import { JwtModule } from '@nestjs/jwt';
import { FetchConnectionRequestController } from './fetch_connection_requests/fetch_connection_requests.controller';
import { FetchConnectionRequestService } from './fetch_connection_requests/fetch_connection_requests.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Connection, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
  ],
  controllers: [
    ToggleConnectionController,
    AcceptConnectionController,
    FetchConnectionRequestController,
  ],
  providers: [
    ToggleConnectionService,
    AcceptConnectionService,
    FetchConnectionRequestService,
  ],
})
export class ConnectionModule {}
