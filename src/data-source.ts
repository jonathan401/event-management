import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

import envConfig from './config/envConfig';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: envConfig.POSTGRES_HOST,
  port: envConfig.POSTGRES_PORT,
  username: envConfig.POSTGRES_USER,
  password: envConfig.POSTGRES_PASSWORD,
  database: envConfig.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: []
};

export const testDatabaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 2345,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  dropSchema: true,
  entities: [],
  migrations: [],
  subscribers: []
};

const AppDataSource = new DataSource(databaseConfig);
const TestDataSource = new DataSource(testDatabaseConfig);

export default { AppDataSource, TestDataSource };
