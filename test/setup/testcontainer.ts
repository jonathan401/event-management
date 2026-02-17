import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';

export interface PostgresConfig {
  username: string;
  password: string;
  port: number;
  database: string;
}

let container: StartedPostgreSqlContainer | null = null;
const CONTAINER_NAME = 'test-postgres-container';
const CONTAINER_IMAGE = 'postgres:18.1-alpine3.23';

export const setupPostgresContainer = async (
  config: PostgresConfig
): Promise<StartedPostgreSqlContainer> => {
  const { username, password, port } = config;

  container = await new PostgreSqlContainer(CONTAINER_IMAGE)
    .withLabels({
      'test-container': CONTAINER_NAME
    })
    .withUsername(username)
    .withPassword(password)
    .withExposedPorts({
      container: 5432,
      host: port
    })
    .withEnvironment({
      NODE_ENV: 'test'
    })
    .start();

  return container;
};

export const removePostgresContainer = async (): Promise<void> => {
  if (container) {
    await container.stop();
    container = null;
  }
};
