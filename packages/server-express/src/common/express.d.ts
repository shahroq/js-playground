import { AuthContext } from "@/common/auth/types";

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}
