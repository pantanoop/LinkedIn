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
import { FetchUserProfileController } from './fetch_user_profile/fetch_user_profile.controller';
import { FetchUserProfileService } from './fetch_user_profile/fetch_user_profile.service';
import { AddUserEducationDataController } from './add_user_education/add_user_education_data.controller';
import { AddUserEducationDataService } from './add_user_education/add_user_education_data.service';
import { Education } from 'src/domain/entities/education.entity';
import { GetUserEducationDataController } from './fetch_user_education/fetch_user_education.controller';
import { GetUserEducationDataService } from './fetch_user_education/fetch_user_education.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Education]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
  ],
  controllers: [
    UserProfileCreateController,
    FetchUsersController,
    AddUserDataController,
    FetchUserProfileController,
    AddUserEducationDataController,
    GetUserEducationDataController,
  ],
  providers: [
    UserProfileCreateService,
    FetchUsersService,
    AddUserDataService,
    FetchUserProfileService,
    AddUserEducationDataService,
    GetUserEducationDataService,
  ],
})
export class UserModule {}
