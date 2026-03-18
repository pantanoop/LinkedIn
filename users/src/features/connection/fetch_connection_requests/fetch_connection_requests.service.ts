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
export class FetchConnectionRequestService {
  constructor(
    @InjectRepository(Connection)
    private connectionRepo: Repository<Connection>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    private dataSource: DataSource,
  ) {}

  async getInvitations(currentUserId: number) {
    const invitations = await this.connectionRepo.find({
      where: {
        receiver: { id: currentUserId },
        status: ConnectionStatus.PENDING,
      },
      relations: ['requester'],
      order: { createdAt: 'DESC' },
    });

    return invitations.map((conn) => ({
      connectionId: conn.id,
      requesterId: conn.requester.id,
      profileName: conn.requester.profileName,
      userTitle: conn.requester.userTitle,
      profileUrl: conn.requester.profileUrl,
    }));
  }
}
