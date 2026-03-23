import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../domain/entities/message.entity';
import { Conversation } from '../../domain/entities/conversation.entity';
import { JwtModule } from '@nestjs/jwt';

import { SendMessageService } from './send_message/send_messages.service';
import { GetMessagesService } from './get_messages/get_messages.service';
import { ConversationModule } from '../conversation/conversation.module';
import { MessageGateway } from 'src/infrastructure/gateway/message.gateway';
@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, Message]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
    ConversationModule,
  ],
  controllers: [],
  providers: [SendMessageService, GetMessagesService, MessageGateway],
  exports: [SendMessageService, GetMessagesService],
})
export class MessageModule {}
