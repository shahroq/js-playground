import type { Request, Response, NextFunction } from "express";
import { authService } from "@/common/container";
import type { UserRole } from "@/routes/v1/users/types";

export async function auth(req: Request, _res: Response, next: NextFunction) {
  req.auth = await authService.authenticate(req);
  next();
}

export function requireAuth() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req?.auth?.isAuthenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };
}

export function requireRole(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req?.auth?.isAuthenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.auth.role!)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}
