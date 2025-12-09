import express from "express";
import cors from "cors";
import type { Application, NextFunction, Request, Response } from "express";
import v1Router from "@/routes/v1";
import {
  config,
  utils,
  globalErrorHandler,
  undefinedRoutesHandler,
  AppError,
  envelopResponseHandler,
  attachSystemDataHandler,
} from "@/common/container";

export const bootstrap = (): Application => {
  const app: Application = express();

  const beforeMWs = [express.json(), cors(), envelopResponseHandler];
  const afterMWs = [undefinedRoutesHandler, globalErrorHandler];
  config.env === "development" &&
    config.envelop_system_info &&
    app.use(attachSystemDataHandler);
  app.use(beforeMWs);

  app.get("/favicon.ico", (_req, res) => res.status(204).end());

  // home
  app.get("/", (_req: Request, res: Response) => {
    console.log(`I am at home`);
    res.send(`API Sandbox Home: Hello World [${utils.formatISO()}]`);
  });

  // health
  app.get("/health", (_req: Request, res: Response) => {
    res.json({ ok: false, environment: config.env });
  });

  // sandbox
  app.get("/sandbox", (_req: Request, res: Response, next: NextFunction) => {
    let error = null;
    let errorApp = null;
    let data = null;

    error = new Error("error sent from sandbox");
    errorApp = new AppError("custom error sent from sandbox", {
      statusCode: 455,
    });
    data = { x: 1 };

    // throw error;
    // next(error);

    // throw errorApp;
    // next(errorApp);

    res.json(data);
  });

  app.use("/api/v1", v1Router);

  app.use(afterMWs);

  return app;
};
