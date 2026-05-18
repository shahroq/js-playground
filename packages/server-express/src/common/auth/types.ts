import type { IUser } from "@/features/v1/users/types";

export type AuthStrategy = "mock" | "jwt" | "auth0";

// export type tokenUserInfo = Pick<IUser, "id" | "name" | "role">;

// Token Payload = claim: info need fo rissue the token (ticket)
export type TokenPayload = Pick<IUser, "id" | "name" | "role">;

// AuthContext = decision
// JWT payload → normalized → AuthContext
export type AuthContext = {
  provider: AuthStrategy;
  isAuthenticated: boolean;
  user?: TokenPayload;
};
