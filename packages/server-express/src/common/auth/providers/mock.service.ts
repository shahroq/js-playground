import type { IAuthService } from "../auth-service.interface";
import type { AuthStrategy, TokenPayload } from "../types";
import { UserRole } from "@/routes/v1/users/types";

export class MockAuthService implements IAuthService {
  readonly _provider = "mock";

  issueToken(_payload: TokenPayload): string {
    return "[Golden Ticket]";
  }

  verifyToken(_token: string): TokenPayload {
    return {
      id: 0,
      name: `Bubble Boy`,
      role: UserRole.ADMIN,
    };
  }

  get provider(): AuthStrategy {
    return this._provider;
  }
}
