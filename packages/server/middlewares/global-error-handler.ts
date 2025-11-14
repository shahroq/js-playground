import type { Request, Response, NextFunction } from "express";
import config from "../core/config";
import type AppError from "../core/app-error";
import { formatter } from "@/core/response";

export function globalErrorHandler(
  e: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // the error is best to pass to default error handler
  if (res.headersSent || config.debug) return next(e);

  // log errors (winston, etc)
  // ..

  const statusCode = (e as AppError).statusCode || 500;
  const status = (e as AppError).status || "error";
  const details = (e as AppError).details || null;

  res
    .status(statusCode)
    .json(
      formatter.error(`Glbl Err: ${getErrorMessage(e)}`, statusCode, details)
    );
}

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (e && typeof e === "object" && "message" in e) return String(e.message);
  if (typeof e === "string") return e;
  return "An error occured";
}
