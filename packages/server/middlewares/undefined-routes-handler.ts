import type { Request, Response, NextFunction } from "express";
import AppError from "@/common/app-error";

export function undefinedErrorHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  next(
    AppError.notFound(
      `Undefined Route: Can't find ${req.originalUrl} on this server.`
    )
  );
}
