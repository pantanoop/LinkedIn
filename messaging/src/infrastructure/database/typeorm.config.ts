import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { Conversation } from '../../domain/entities/conversation.entity';
import { Message } from '../../domain/entities/message.entity';

dotenv.config();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Conversation, Message],
  migrations: [join(__dirname, 'migrations', '*.ts')],
  synchronize: false,
};
