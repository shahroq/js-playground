import { t } from "@/common/container";
import type { AuthStrategy } from "./types";
import { AnonymousAuthService } from "./anonymous/anonymous.service";
import { JwtAuthService } from "./jwt/jwt.service";

// names: module/mode/service/provider?
const module = "auth service";
let service = null;

export function authServiceFactory(strategy: AuthStrategy) {
  console.log(t("console.getProvider", { module, strategy }));

  switch (strategy) {
    case "anonymous":
      service = new AnonymousAuthService();
      break;
    case "jwt":
      service = new JwtAuthService();
      break;
    // case "auth0":
    //   service = new Auth0AuthService();
    //   break;
    default:
      throw new Error(t("console.noProvider", { module, strategy }));
  }

  return service;
}

export function resetAuth(): void {
  service = null;
}

/*
// sample usage
const mail = {
  to: config.mailer.admin_email,
  subject: "Sandbox",
  text: "Sent from sand box",
};
await mailer.send(mail).catch((error) => new AppError("Mailtrap Error."));
res.json("mail sent!");
*/
