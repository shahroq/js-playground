import type { Request, Response, NextFunction } from "express";
import { AppError } from "../container";

export function undefinedRoutesHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const msg = `Undefined Route: Can't find ${req.originalUrl} on this server.`;
  return next(AppError.NotFound(msg, { code: "ERR_NF" }));
}
