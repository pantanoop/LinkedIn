import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterUserModule } from './features/register_user/register_user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/database/typeorm.config';
import { LoginUserModule } from './features/login_user/login_user.module';
import { UserProfileCreateModule } from './features/userProfile_create/userProfile_create.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RegisterUserModule,
    LoginUserModule,
    UserProfileCreateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
