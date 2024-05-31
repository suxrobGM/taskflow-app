import {DataSource} from 'typeorm';
import {Project, Task, User} from './entities';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'TaskflowDB',
  username: 'postgres',
  password: 'postgres',
  entities: [
    Project,
    Task,
    User,
  ],
  migrationsTableName: 'migrations_history',
  migrations: [
    (process.env.NODE_ENV as string) === 'migration' ? 'dist/migrations/*.js' : '',
  ],
});

export default AppDataSource;
