import express from "express";
import cors from "cors";
import type { Application, Request, Response, NextFunction } from "express";
import AppError from "@/core/app-error";
import { errorHandler } from "@/middlewares/error-handler";
import sandboxRoutes from "./routes/sandbox";
import v1Router from "@/routes/v1";
import config from "@/core/config";
import { isoString } from "@/core/utils";
import { formatter } from "@/core/response";

export const bootstrap = (): Application => {
  const app: Application = express();
  app.use(express.json()).use(cors());

  app.get("/favicon.ico", (req, res) => res.status(204).end());

  // home
  app.get("/", (req: Request, res: Response) => {
    console.log(`I am at home`);
    res.send(`API Sandbox Home: Hello World [${isoString()}]`);
  });

  // health
  app.get("/health", (req: Request, res: Response) => {
    res.json(formatter.success({ ok: true, environment: config.env }));
  });

  app.use("/api/sandbox", sandboxRoutes); // my sandbox
  app.use("/api/v1", v1Router);

  // undefined routes
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(AppError.notFound(`Can't find ${req.originalUrl} on this server.`));
  });

  // global error handler
  app.use(errorHandler);

  return app;
};
