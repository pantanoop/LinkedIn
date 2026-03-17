// follow.service.ts
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
      };
    }
    if (existingConnection.status === 'ACCEPTED') {
      return this.dataSource.transaction(async (manager) => {
        await manager.decrement(
          User,
          { id: currentUserId },
          'connectionsCount',
          1,
        );
        await manager.decrement(
          User,
          { id: targetUserId },
          'connectionsCount',
          1,
        );

        await manager.delete(Connection, { id: existingConnection.id });

        return {
          message: 'Connection removed',
          status: 'NONE',
        };
      });
    }
  }
}
