import { config, t } from "@/common/container";
import type { IAuthService } from "./auth-service.interface";
import { AnonymousAuthService } from "./providers/anonymous.service";
import { JwtAuthService } from "./providers/jwt.service";
import { Auth0AuthService } from "./providers/auth0.service";

const module = "auth service";
const strategy = config.auth.strategy;

console.log(t("console.getProvider", { module, strategy }));

let provider: IAuthService;
switch (strategy) {
  case "anonymous":
    provider = new AnonymousAuthService();
    break;
  case "jwt":
    provider = new JwtAuthService();
    break;
  case "auth0":
    provider = new Auth0AuthService();
    break;
  default:
    throw new Error(t("console.noProvider", { module, strategy }));
}

export { provider as authService };
