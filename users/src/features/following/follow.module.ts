import { Module } from '@nestjs/common';
import { FollowService } from './follow_unfollow/follow_unfollow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { Follow } from '../../domain/entities/follow.entity';
import { FollowController } from './follow_unfollow/follow_unfollow.controller';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Follow, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
  ],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
