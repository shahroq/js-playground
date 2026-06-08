import jwt from "jsonwebtoken";
import { config } from "@/common/container";
import type { IAuthService } from "../auth-service.interface";
import type { AuthStrategy, TokenPayload } from "../types";

export class JwtAuthService implements IAuthService {
  readonly _provider = "jwt";
  private readonly _expiresIn = config.auth.jwt.expires_in;
  private readonly _secret = config.auth.jwt.secret;

  issueToken(payload: TokenPayload) {
    return jwt.sign(payload, this._secret, { expiresIn: this._expiresIn });
  }

  verifyToken(token: string): TokenPayload {
    return jwt.verify(token, this._secret) as TokenPayload;
  }

  get provider(): AuthStrategy {
    return this._provider;
  }
}
