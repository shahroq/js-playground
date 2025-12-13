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
  if (res.headersSent || config.debug.show_thrown_errors) return next(error);

  // TODO: log errors (winston, etc)
  // ..

  // generate public message
  let publicMessage = "";

  // check if it's prisma error (exposes too much)
  // if (error?.name?.startsWith(`Prisma`)) publicMessage += `ORM Error.`;

  // add a prefix to error message
  // publicMessage += `Global Err: ${error.message}`;

  if (publicMessage) error.meta.publicMessage = publicMessage;

  res.json(error);
}
