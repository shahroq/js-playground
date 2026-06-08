import type { AuthStrategy, TokenPayload } from "./types";

export interface IAuthService {
  readonly _provider: AuthStrategy;

  get provider(): AuthStrategy;

  /**
   * Issue a ticket (token) based on venue visitor info (payload).
   * `payload` to `token` by signing
   * */
  issueToken(payload: TokenPayload): string;

  /** verify the ticket (token) for the access to the venue (app) */
  verifyToken(token: string): TokenPayload;
}
