import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../../../domain/entities/message.entity';
import { Conversation } from '../../../domain/entities/conversation.entity';
import { Repository } from 'typeorm';
import { CreateConversationService } from '../../conversation/create_conversation/create_conversation.service';

@Injectable()
export class SendMessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,

    @InjectRepository(Conversation)
    private readonly conversationRepo: Repository<Conversation>,

    private readonly createConversationService: CreateConversationService,
  ) {}

  async sendMessage(
    senderId: string,
    receiverId: string,
    text: string,
    mediaUrls: string[] = [],
  ) {
    const conversation = await this.createConversationService.create_convo(
      senderId,
      receiverId,
    );
    const messageEntity = this.messageRepo.create({
      conversation: { id: conversation.id },
      senderId,
      message: text || null,
      mediaUrls: mediaUrls?.length ? mediaUrls : null,
    } as Partial<Message>);
    const message = await this.messageRepo.save(messageEntity);

    await this.conversationRepo.update(conversation.id, {
      lastMessage: text || (mediaUrls.length ? '📷 Media' : ''),
      lastMessageSenderId: senderId,
    });
    return {
      ...message,
      conversationId: conversation.id,
    };
  }
}
