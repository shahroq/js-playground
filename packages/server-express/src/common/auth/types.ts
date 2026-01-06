import type { UserRole } from "@/routes/v1/users/types";
import type { EntityId } from "../types";

export type AuthStrategy = "anonymous" | "jwt" | "auth0";

// JWT Payload = claim
export interface JwtPayload {
  userId: EntityId;
  role: UserRole;
}

// AuthContext = decision
// JWT payload → normalized → AuthContext
export interface AuthContext {
  isAuthenticated: boolean;
  userId?: EntityId;
  role?: UserRole;
  provider: AuthStrategy;
}
