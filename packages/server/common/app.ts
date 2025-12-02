import express from "express";
import cors from "cors";
import type { Application, NextFunction, Request, Response } from "express";
import v1Router from "@/routes/v1";
import {
  config,
  utils,
  appEnvelope,
  globalErrorHandler,
  undefinedRoutesHandler,
} from "@/common/container";

export const bootstrap = (): Application => {
  const app: Application = express();
  app.use(express.json()).use(cors());

  app.get("/favicon.ico", (_req, res) => res.status(204).end());

  // home
  app.get("/", (_req: Request, res: Response) => {
    console.log(`I am at home`);
    res.send(`API Sandbox Home: Hello World [${utils.isoString()}]`);
  });

  // health
  app.get("/health", (_req: Request, res: Response) => {
    res.json(appEnvelope.create(null, { ok: true, environment: config.env }));
  });

  // sandbox
  app.get("/sandbox", (_req: Request, res: Response, _next: NextFunction) => {
    let e = null;
    let data = {};

    res.json(appEnvelope.create(e, { data }));
  });

  app.use("/api/v1", v1Router);

  app.use(undefinedRoutesHandler);
  app.use(globalErrorHandler);

  return app;
};
