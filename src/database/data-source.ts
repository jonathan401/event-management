import { DataSource, DataSourceOptions } from 'typeorm';

import envConfig from '../config/envConfig';
import { User } from '../entities/User';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: envConfig.POSTGRES_HOST,
  port: envConfig.POSTGRES_PORT,
  username: envConfig.POSTGRES_USER,
  password: envConfig.POSTGRES_PASSWORD,
  database: envConfig.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [User],
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
  entities: [User],
  migrations: [],
  subscribers: []
};

export const AppDataSource = new DataSource(databaseConfig);
export const TestDataSource = new DataSource(testDatabaseConfig);
