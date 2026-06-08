import express, { type Application } from "express";
import cors from "cors";
import morgan from "morgan";
import appRouter from "@/features/v1/routes";
import {
  config,
  globalErrorHandler,
  undefinedRoutesHandler,
  wrapResponseHandler,
  attachSystemInfoHandler,
} from "@/common/container";

export const bootstrap = (): Application => {
  const app: Application = express();

  // Enable extended query parsing
  app.set("query parser", "extended");

  const beforeMWs = [express.json(), cors(), wrapResponseHandler];
  const afterMWs = [undefinedRoutesHandler, globalErrorHandler];
  if (config.logger.morgan_enabled)
    app.use(morgan(config.logger.morgan_format));
  if (config.env === "development" && config.envelope.include_system_info)
    app.use(attachSystemInfoHandler);
  app.use(beforeMWs);

  app.get("/favicon.ico", (_, res) => res.status(204).end());

  // app.use("/api/v1", appRouter);
  app.use("/", appRouter);

  app.use(afterMWs);

  return app;
};
