import type { Request, Response, NextFunction } from "express";
import { ApiError } from "@/common/container";

export function undefinedRoutesHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const e = ApiError.notFound(
    `Undefined Route: Can't find ${req.originalUrl} on this server.`
  );

  next(e);
}
