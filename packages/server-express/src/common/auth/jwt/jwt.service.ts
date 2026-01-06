import type { Request } from "express";
import jwt from "jsonwebtoken";
import { config } from "@/common/container";
import type { IAuthService } from "../auth-service.interface";
import type { AuthContext, JwtPayload } from "../types";

export class JwtAuthService implements IAuthService {
  async authenticate(req: Request): Promise<AuthContext> {
    const authHeader = req.headers?.authorization;

    if (!authHeader?.startsWith("Bearer "))
      return {
        isAuthenticated: false,
        provider: "jwt",
      };

    const token = authHeader.split(" ")[1]!;

    try {
      const payload = this.verifyToken(token);

      return {
        isAuthenticated: true,
        userId: payload.userId,
        role: payload.role,
        provider: "jwt",
      };
    } catch (e) {
      return {
        isAuthenticated: false,
        provider: "jwt",
      };
    }
  }

  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, config.auth.jwt.secret) as JwtPayload;
  }

  signToken(payload: JwtPayload) {
    const expiresIn = config.auth.jwt.expire_in;
    const secret = config.auth.jwt.secret;

    return jwt.sign(payload, secret, { expiresIn });
  }
}
