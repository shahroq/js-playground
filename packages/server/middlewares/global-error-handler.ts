import type { Request, Response, NextFunction } from "express";
import config from "@/common/config/config";
import AppError from "@/common/error/app-error";
import { formatter } from "@/common/response/factory";

export function globalErrorHandler(
  e: Error | AppError,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  // the error is best to pass to default error handler
  if (res.headersSent || config.debug) return next(e);

  // TODO: log errors (winston, etc)
  // ..

  const statusCode = (e as AppError).meta.statusCode || 500;

  // TODO: convert to AppError?
  // ..
  /*
  console.log(e);
  res
    .status(statusCode)
    .json(
      formatter.error(`Glbl Err: ${getErrorMessage(e)}`, statusCode, details)
    );
  */
  const message = `Glbl Err: ${getErrorMessage(e)}`;
  res.status(statusCode).json(formatter.format(e as AppError, { message }));
}

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (e && typeof e === "object" && "message" in e) return String(e.message);
  if (typeof e === "string") return e;
  return "An error occured";
}
