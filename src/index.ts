/* eslint-disable no-console */

import express from "express";

import envConfig from "./config/envConfig";
import dataSource from "./data-source";

const { PORT } = envConfig;

export const main = async () => {
  try {
    await dataSource.AppDataSource.initialize();
    const app = express();
    app.use(express.json());

    app.get("/", (_, res) => {
      res.send({
        message: "Welcome to the Event Management API!",
      });
    });

    app.use((req, res) =>
      res.status(404).send({
        message: `This route does not exist: [${req.method}] ${req.url}`,
      }),
    );

    app.listen(PORT, () => {
      console.log(`Server listening on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
