import { DataSourceOptions } from 'typeorm';
import { UserAccount } from '../../domain/entities/user_account.entity';
import { User } from '../../domain/entities/user.entity';

import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserAccount, User],
  migrations: [join(__dirname, 'migrations', '*.ts')],
  synchronize: false,
};
