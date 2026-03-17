import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/database/typeorm.config';
import { UserModule } from './features/user/user.module';
import { FollowModule } from './features/following/follow.module';
import { ConnectionModule } from './features/connection/connection.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    FollowModule,
    ConnectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
