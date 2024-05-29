import {DataSource} from 'typeorm';
import {DatabaseConfig} from './DatabaseConfig';

const AppDataSource = new DataSource(DatabaseConfig);
export default AppDataSource;
