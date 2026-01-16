import { config, t } from "@/common/container";
import type { IAuthService } from "./auth-service.interface";
import { MockAuthService } from "./providers/mock.service";
import { JwtAuthService } from "./providers/jwt.service";
// import { Auth0AuthService } from "./providers/auth0.service";

const module = "auth service";
const strategy = config.auth.strategy;

console.log(t("CONSOLE.GET_PROVIDER", { module, strategy }));

let provider: IAuthService;
switch (strategy) {
  case "mock":
    provider = new MockAuthService();
    break;
  case "jwt":
    provider = new JwtAuthService();
    break;
  /*  
  case "auth0":
    provider = new Auth0AuthService();
    break;
  */
  default:
    throw new Error(t("CONSOLE.NO_PROVIDER", { module, strategy }));
}

export { provider as authService };
