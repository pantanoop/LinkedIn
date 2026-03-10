import { Module } from '@nestjs/common';
import { LoginUserService } from './login_user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from '../../domain/entities/user_account.entity';
import { LoginUserController } from './login_user.controller';
@Module({
  imports: [TypeOrmModule.forFeature([UserAccount])],
  controllers: [LoginUserController],
  providers: [LoginUserService],
})
export class LoginUserModule {}
