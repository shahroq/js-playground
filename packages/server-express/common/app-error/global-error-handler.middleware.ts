import type { Request, Response, NextFunction } from "express";
import { config, appEnvelope, AppError } from "@/common/container";

export function globalErrorHandler(
  error: Error | AppError,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  // console.log(e);
  // the error is best to pass to default error handler
  if (res.headersSent || config.debug) return next(error);

  // TODO: log errors (winston, etc)
  // ..

  const message = `Glbl Err: ${AppError.getMessage(error)}`;
  res
    .status(AppError.getStatusCode(error))
    .json(appEnvelope.create(error as AppError, { message }));
}
