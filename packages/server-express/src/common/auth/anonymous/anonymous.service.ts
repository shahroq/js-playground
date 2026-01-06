import type { Request } from "express";
import type { IAuthService } from "../auth-service.interface";
import type { AuthContext } from "../types";
import { UserRole } from "@/routes/v1/users/types";

export class AnonymousAuthService implements IAuthService {
  async authenticate(req: Request): Promise<AuthContext> {
    return {
      isAuthenticated: true,
      provider: "anonymous",
      role: UserRole.ADMIN,
    };
  }
}
