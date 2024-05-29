import * as path from 'path';
import {DataSourceOptions} from 'typeorm';

export const DatabaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'TaskTrackerDB',
  username: 'postgres',
  password: 'postgres',
  entities: [`dist/entities/*Entity.{ts,js}`],
  migrationsTableName: 'migrations_history',
  migrations: [`dist/migrations/*.{ts,js}`],
};
