import type { Request } from "express";
import type { AuthContext } from "./types";

export interface IAuthService {
  authenticate(req: Request): Promise<AuthContext>;
}
