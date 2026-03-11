import { Module } from '@nestjs/common';
import { ToggleLikeService } from './toggle_like/toggle_like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../../domain/entities/like.entity';
import { ToggleLikeController } from './toggle_like/toggle_like.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
  ],
  controllers: [ToggleLikeController],
  providers: [ToggleLikeService],
})
export class LikeModule {}
