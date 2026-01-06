import { JwtPayload, AuthContext } from "@/common/auth/types";

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
      // auth?: AuthContext | JwtPayload;
    }
  }
}
