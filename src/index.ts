import 'reflect-metadata';

import express from 'express';

import envConfig from './config/envConfig';
import { AppDataSource } from './database';
import UserRoute from './routes/userRoutes';
import { logger } from './utils';

const PORT = envConfig.PORT;

const main = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('Database connection established successfully 🚀');
  } catch (error) {
    logger.error('Failed to initialize AppDataSource:', error);
  }
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (_, res) => {
    res.status(200).send({
      message: 'Welcome to the Event Management API!'
    });
  });

  app.use('/api/v1/users', UserRoute);

  app.listen(PORT, () => {
    logger.info(`Server listening on port http://localhost:${PORT}`);
  });
};

main().catch((error) => {
  logger.error('Unexpected error:', error);
  process.exit(1);
});
