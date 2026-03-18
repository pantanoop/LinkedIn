import { Module } from '@nestjs/common';
import { UserProfileCreateService } from './userProfile_create/userProfile_create.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserProfileCreateController } from './userProfile_create/userProfile_create.controller';
import { JwtModule } from '@nestjs/jwt';
import { FetchUsersController } from './fetch_users/fetch_users.controller';
import { FetchUsersService } from '../user/fetch_users/fetch_users.service';
import { AddUserDataController } from './add_user_data/add_user_profile_data.controller';
import { AddUserDataService } from './add_user_data/add_user_profile_data.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
  ],
  controllers: [
    UserProfileCreateController,
    FetchUsersController,
    AddUserDataController,
  ],
  providers: [UserProfileCreateService, FetchUsersService, AddUserDataService],
})
export class UserModule {}
