import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../domain/entities/message.entity';
import { Conversation } from '../../domain/entities/conversation.entity';
import { JwtModule } from '@nestjs/jwt';
import { CreateConversationService } from './create_conversation/create_conversation.service';
import { FindConversationService } from './find_conversation/find_conversation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, Message]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
  ],
  controllers: [],
  providers: [CreateConversationService, FindConversationService],
  exports: [CreateConversationService],
})
export class ConversationModule {}
