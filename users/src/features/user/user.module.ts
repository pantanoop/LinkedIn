import { Module } from '@nestjs/common';
import { UserProfileCreateService } from './userProfile_create/userProfile_create.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserProfileCreateController } from './userProfile_create/userProfile_create.controller';
import { JwtModule } from '@nestjs/jwt';
import { FetchUsersController } from './fetch_users/fetch_users.controller';
import { FetchUsersService } from '../user/fetch_users/fetch_users.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
  ],
  controllers: [UserProfileCreateController, FetchUsersController],
  providers: [UserProfileCreateService, FetchUsersService],
})
export class UserModule {}
