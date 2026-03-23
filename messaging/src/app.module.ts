import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/database/typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { MessageModule } from './features/messages/messages.module';
import { ConversationModule } from './features/conversation/conversation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
    MessageModule,
    ConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
