import type { Request, Response, NextFunction } from "express";
import { config } from "@/common/container";
import type { E } from "./types";

export function globalErrorHandler(
  error: E,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  // the error is best to pass to default error handler
  if (res.headersSent || config.debug) return next(error);

  // TODO: log errors (winston, etc)
  // ..

  res.json(error);
}
