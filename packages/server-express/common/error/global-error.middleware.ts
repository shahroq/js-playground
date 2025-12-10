import type { Response, NextFunction } from "express";
import { config } from "@/common/container";
import type { E } from "./types";

export function globalErrorHandler(
  error: E,
  _: any,
  res: Response,
  next: NextFunction
): void {
  // the error is best to pass to default error handler
  if (res.headersSent || config.debug) return next(error);

  // TODO: log errors (winston, etc)
  // ..

  // TODO: fix this? is it possible to override error message
  // add a prefix to error message
  // error.messageOverriden = `Global Err: ${error.message}`;

  // check if it's prisma error (expose too much)
  if (error?.name?.startsWith(`Prisma`)) error.messageOverriden = `ORM Error.`;

  res.json(error);
}
