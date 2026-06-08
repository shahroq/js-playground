// import { type Request } from "export";
import { AuthContext } from "@/common/auth/types";

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}
/**
 * force devs to use type guards whenever needed[st crs: ep14-09]
 * const {email, password} = req.body
 * if (email) {...}
 */
// interface RequestWithBody extends Request {
//   body: { [key: string]: string | undefined };
// }
