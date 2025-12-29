import type { Request, Response, NextFunction } from "express";
import { config, logger } from "@/common/container";
import type { E } from "./types";

export function globalErrorHandler(
  error: E,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = error?.meta?.statusCode || 500;
  let publicMessage = "";

  // check if it's prisma error (exposes too much)
  // if (error?.name?.startsWith(`Prisma`)) publicMessage += `ORM Error.`;

  // add a prefix to error message
  // publicMessage += `Global Err: ${error.message}`;

  if (publicMessage) error.meta.publicMessage = publicMessage;

  // logger
  logger.error(publicMessage || error.message, {
    stack: error.stack,
    path: req.originalUrl,
  });

  // the error is best to pass to default error handler
  if (res.headersSent || config.debug.show_thrown_errors) return next(error);

  res.status(statusCode).json(error);
}
