import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../../../domain/entities/conversation.entity';

@Injectable()
export class FindConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepo: Repository<Conversation>,
  ) {}

  async find_convo(user1: string, user2: string) {
    const participants = [user1, user2].sort().join(',');

    let convo = await this.conversationRepo.findOne({
      where: { participants },
    });

    if (!convo) {
      throw new NotFoundException('Conversation not found');
    }

    return convo;
  }
}
