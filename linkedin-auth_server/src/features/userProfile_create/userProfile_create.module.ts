import { Module } from '@nestjs/common';
import { UserProfileCreateService } from './userProfile_create.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserProfileCreateController } from './userProfile_create.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserProfileCreateController],
  providers: [UserProfileCreateService],
})
export class UserProfileCreateModule {}
