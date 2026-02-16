import "dotenv/config";

type EnvConfig = {
  PORT: number;
  POSTGRES_PORT: number;
  NODE_ENV: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_HOST: string;
  POSTGRES_DB: string;
};

type ENV = Partial<EnvConfig> & {
  [K in keyof EnvConfig]: EnvConfig[K] | undefined;
};

const getConfig = (): ENV => ({
  PORT: Number(process.env.PORT),
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT),
  NODE_ENV: process.env.NODE_ENV,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_DB: process.env.POSTGRES_DB,
});

const getSanitizedConfig = (config: ENV): EnvConfig => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) throw new Error(`Missing key ${key} in .env`);
  }

  return config as EnvConfig;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
