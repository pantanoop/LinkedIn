import { Module } from '@nestjs/common';
import { RegisterUserService } from './register_user/register_user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from '../../domain/entities/user_account.entity';

import { RegisterUserController } from './register_user/register_user.controller';
import { JwtModule } from '@nestjs/jwt';
import { LoginUserController } from './login_user/login_user.controller';
import { LoginUserService } from './login_user/login_user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAccount]),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
    }),
  ],
  controllers: [RegisterUserController, LoginUserController],
  providers: [RegisterUserService, LoginUserService],
})
export class AuthModule {}
