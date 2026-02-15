import express from "express";

import "dotenv/config";
import { logger } from "./utils";

export const main = () => {
  const app = express();

  app.use(express.json());

  app.get("/", (_, res) => {
    res.send({
      message: "Welcome to the Event Management API!",
    });
  });

  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {
    logger.info(`Server listening on port http://localhost:${PORT}`);
  });
};

main();
