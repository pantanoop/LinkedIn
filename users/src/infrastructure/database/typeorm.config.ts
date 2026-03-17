import { DataSourceOptions } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { Follow } from '../../domain/entities/follow.entity';
import { Connection } from '../../domain/entities/connection.entity';

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
  entities: [User, Follow, Connection],
  migrations: [join(__dirname, 'migrations', '*.ts')],
  synchronize: false,
};
