import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Connection } from '../../../domain/entities/connection.entity';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class ToggleConnectionService {
  constructor(
    @InjectRepository(Connection)
    private connectionRepo: Repository<Connection>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    private dataSource: DataSource,
  ) {}

  async toggleConnection(data: any) {
    const { currentUserId, targetUserId } = data;

    if (currentUserId === targetUserId) {
      throw new BadRequestException('You cannot connect with yourself');
    }

    const [currentUser, targetUser] = await Promise.all([
      this.userRepo.findOne({ where: { id: currentUserId } }),
      this.userRepo.findOne({ where: { id: targetUserId } }),
    ]);

    if (!currentUser || !targetUser) {
      throw new NotFoundException('User not found');
    }

    const existingConnection = await this.connectionRepo.findOne({
      where: [
        {
          requester: { id: currentUserId },
          receiver: { id: targetUserId },
        },
        {
          requester: { id: targetUserId },
          receiver: { id: currentUserId },
        },
      ],
      relations: ['requester', 'receiver'],
    });

    if (!existingConnection) {
      const connection = this.connectionRepo.create({
        requester: currentUser,
        receiver: targetUser,
      });

      await this.connectionRepo.save(connection);

      return {
        message: 'Connection request sent',
        status: 'PENDING',
        connectionId: connection.id,
        targetUserId,
      };
    }
    if (existingConnection.status === 'PENDING') {
      if (existingConnection.requester.id !== currentUserId) {
        throw new BadRequestException('You cannot cancel this request');
      }

      await this.connectionRepo.delete(existingConnection.id);

      return {
        message: 'Connection request cancelled',
        status: 'NONE',
        targetUserId,
      };
    }
    if (existingConnection.status === 'ACCEPTED') {
      return this.dataSource.transaction(async (manager) => {
        const requesterId = existingConnection.requester.id;
        const receiverId = existingConnection.receiver.id;

        await manager
          .createQueryBuilder()
          .update(User)
          .set({
            connectionsCount: () => 'GREATEST(connectionsCount - 1, 0)',
          })
          .where('id = :id', { id: requesterId })
          .execute();

        await manager
          .createQueryBuilder()
          .update(User)
          .set({
            connectionsCount: () => 'GREATEST(connectionsCount - 1, 0)',
          })
          .where('id = :id', { id: receiverId })
          .execute();

        await manager.delete(Connection, { id: existingConnection.id });

        const [updatedRequester, updatedReceiver] = await Promise.all([
          manager.findOne(User, { where: { id: requesterId } }),
          manager.findOne(User, { where: { id: receiverId } }),
        ]);

        return {
          message: 'Connection removed',
          status: 'NONE',
          targetUserId,
          requesterId,
          requesterConnectionsCount: updatedRequester?.connectionsCount,
          receiverConnectionsCount: updatedReceiver?.connectionsCount,
        };
      });
    }
  }
}
