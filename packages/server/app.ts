import express from "express";
import cors from "cors";
import type { Application, Request, Response, NextFunction } from "express";

import sandboxRoutes from "./routes/sandbox";
import v1Router from "@/routes/v1";
import config from "@/common/config";
import { isoString } from "@/common/utils";
import { formatter } from "@/common/response";
import { undefinedErrorHandler, globalErrorHandler } from "@/middlewares";

export const bootstrap = (): Application => {
  const app: Application = express();
  app.use(express.json()).use(cors());

  app.get("/favicon.ico", (_req, res) => res.status(204).end());

  // home
  app.get("/", (_req: Request, res: Response) => {
    console.log(`I am at home`);
    res.send(`API Sandbox Home: Hello World [${isoString()}]`);
  });

  // health
  app.get("/health", (_req: Request, res: Response) => {
    res.json(formatter.format(null, { ok: true, environment: config.env }));
  });

  app.use("/api/sandbox", sandboxRoutes); // my sandbox
  app.use("/api/v1", v1Router);

  app.use(undefinedErrorHandler);
  app.use(globalErrorHandler);

  return app;
};
