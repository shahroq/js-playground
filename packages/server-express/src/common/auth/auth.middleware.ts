import type { Request, Response, NextFunction } from "express";
import { AppError, authService, config } from "@/common/container";
import type { UserRole } from "@/routes/v1/users/types";

// here: maybe name it guard, and make it similar to nestjs guard api? make a package out of it?
export function requireAuth() {
  return (req: Request, _res: Response, next: NextFunction) => {
    const authHeader =
      config.env === `development` && authService.provider === `anonymous`
        ? "Bearer [Golden Ticket]"
        : req.headers?.authorization;

    if (!authHeader)
      return next(
        AppError.Unauthorized(`No authorization header`, { code: "ERR_AUTH" })
      );

    const token = authHeader.replace("Bearer ", "");

    try {
      req.auth = {
        provider: authService.provider,
        isAuthenticated: true,
        user: authService.verifyToken(token),
      };
    } catch (e) {
      // console.log(`->` + e);
      return next(
        AppError.Unauthorized(`Invalid or expired token (auth)`, {
          code: "ERR_AUTH",
        })
      );
    }

    next();
  };
}

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req?.auth?.isAuthenticated)
      return next(
        AppError.Unauthorized(`Unauthorized: User not authenticated`, {
          code: "ERR_AUTH",
        })
      );

    if (!allowedRoles.includes(req?.auth?.user?.role))
      return next(
        AppError.Unauthorized(`Forbidden: Insufficient permissions`, {
          code: "ERR_AUTH",
        })
      );

    next();
  };
}
