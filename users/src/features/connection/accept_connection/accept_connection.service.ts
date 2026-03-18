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

      const requesterId = connection.requester.id;
      const receiverId = connection.receiver.id;

      await manager.increment(User, { id: requesterId }, 'connectionsCount', 1);
      await manager.increment(User, { id: receiverId }, 'connectionsCount', 1);

      // ✅ fetch updated values
      const [updatedRequester, updatedReceiver] = await Promise.all([
        manager.findOne(User, { where: { id: requesterId } }),
        manager.findOne(User, { where: { id: receiverId } }),
      ]);

      return {
        message: 'Connection accepted',
        status: 'ACCEPTED',
        connectionId: connection.id,
        requesterId,
        requesterConnectionsCount: updatedRequester?.connectionsCount,
        receiverConnectionsCount: updatedReceiver?.connectionsCount,
      };
    });
  }
}
