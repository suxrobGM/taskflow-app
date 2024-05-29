import {DataSource} from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'TaskTrackerDB',
  username: 'postgres',
  password: 'postgres',
  entities: [`dist/entities/*Entity.{ts,js}`],
  migrationsTableName: 'migrations_history',
  migrations: [`dist/migrations/*.{ts,js}`],
});
export default AppDataSource;
