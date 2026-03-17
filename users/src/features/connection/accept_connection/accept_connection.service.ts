// follow.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ConnectionStatus } from '../../../domain/entities/connection.entity';

import { Connection } from '../../../domain/entities/connection.entity';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class AcceptConnectionService {
  constructor(
    @InjectRepository(Connection)
    private connectionRepo: Repository<Connection>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    private dataSource: DataSource,
  ) {}

  async acceptConnection(data: any) {
    const { connectionId, currentUserId } = data;

    const connection = await this.connectionRepo.findOne({
      where: { id: connectionId },
      relations: ['requester', 'receiver'],
    });

    if (!connection) {
      throw new NotFoundException('Connection not found');
    }

    if (connection.receiver.id !== currentUserId) {
      throw new BadRequestException('Only receiver can accept');
    }

    if (connection.status !== 'PENDING') {
      throw new BadRequestException('Invalid request');
    }

    return this.dataSource.transaction(async (manager) => {
      connection.status = ConnectionStatus.ACCEPTED;
      await manager.save(connection);

      await manager.increment(
        User,
        { id: connection.requester.id },
        'connectionsCount',
        1,
      );
      await manager.increment(
        User,
        { id: connection.receiver.id },
        'connectionsCount',
        1,
      );

      return {
        message: 'Connection accepted',
        status: 'ACCEPTED',
      };
    });
  }
}
