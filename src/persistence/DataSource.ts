import {DataSource} from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'TaskflowDB',
  username: 'postgres',
  password: 'postgres',
  entities: ['dist/entities/*Entity.js'],
  migrationsTableName: 'migrations_history',
  migrations: ['dist/migrations/*.js'],
});
export default AppDataSource;
