import jwt from "jsonwebtoken";
import { config } from "@/common/container";
import type { IAuthService } from "../auth-service.interface";
import type { AuthStrategy, TokenPayload } from "../types";

export class Auth0AuthService implements IAuthService {
  readonly _provider = "auth0";
  private jwks = jwksClient({
    jwksUri: `https://${config.auth.auth0.domain}/.well-known/jwks.json`,
    cache: true,
    rateLimit: true,
  });

  issueToken(): never {
    throw new Error("Auth0 does not support issuing tokens from backend");
  }

  async verifyToken(token: string): Promise<TokenPayload> {
    const decoded = jwt.decode(token, { complete: true });

    if (!decoded || typeof decoded === "string")
      throw new Error("Invalid token");

    const key = await this.jwks.getSigningKey(decoded.header.kid);
    const publicKey = key.getPublicKey();

    return jwt.verify(token, publicKey, {
      audience: config.auth.auth0.audience,
      issuer: `https://${config.auth.auth0.domain}/`,
      algorithms: ["RS256"],
    }) as TokenPayload;
  }

  get provider(): AuthStrategy {
    return this._provider;
  }
}
