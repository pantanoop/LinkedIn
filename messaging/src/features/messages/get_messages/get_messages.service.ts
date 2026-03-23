import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../../../domain/entities/message.entity';
import { Conversation } from '../../../domain/entities/conversation.entity';
import { Repository } from 'typeorm';
import { CreateConversationService } from '../../conversation/create_conversation/create_conversation.service';

@Injectable()
export class GetMessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,

    @InjectRepository(Conversation)
    private readonly conversationRepo: Repository<Conversation>,

    private readonly createConversationService: CreateConversationService,
  ) {}

  async getMessages(conversationId: number) {
    return this.messageRepo.find({
      where: { conversationId },
      order: { createdAt: 'ASC' },
    });
  }
}
