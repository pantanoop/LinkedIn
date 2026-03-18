import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Connection } from '../../../domain/entities/connection.entity';

@Injectable()
export class GetConnectionStatusService {
  constructor(
    @InjectRepository(Connection)
    private connectionRepo: Repository<Connection>,
  ) {}

  async getConnectionStatuses(currentUserId: number) {
    const connections = await this.connectionRepo.find({
      where: [
        { requester: { id: currentUserId } },
        { receiver: { id: currentUserId } },
      ],
      relations: ['requester', 'receiver'],
    });

    return connections.map((conn) => {
      const isRequester = conn.requester.id === currentUserId;

      return {
        userId: isRequester ? conn.receiver.id : conn.requester.id,
        status: conn.status,
        connectionId: conn.id,
      };
    });
  }
}
