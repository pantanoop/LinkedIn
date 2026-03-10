import { Module } from '@nestjs/common';
import { RegisterUserService } from './register_user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from '../../domain/entities/user_account.entity';
import { RegisterUserController } from './register_user.controller';
@Module({
  imports: [TypeOrmModule.forFeature([UserAccount])],
  controllers: [RegisterUserController],
  providers: [RegisterUserService],
})
export class RegisterUserModule {}
