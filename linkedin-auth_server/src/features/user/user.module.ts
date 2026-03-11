import { Module } from '@nestjs/common';
import { UserProfileCreateService } from './userProfile_create/userProfile_create.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserProfileCreateController } from './userProfile_create/userProfile_create.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
  ],
  controllers: [UserProfileCreateController],
  providers: [UserProfileCreateService],
})
export class UserModule {}
