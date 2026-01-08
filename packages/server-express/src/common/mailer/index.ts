import { config, t } from "@/common/container.ts";
import type { IMailerService } from "./mailer-service.interface";
import { ConsoleLogService } from "./providers/console-log.service";
import { MailtrapService } from "./providers/mailtrap.service";

const module = "mailer service";
const strategy = config.mailer.strategy;

console.log(t("console.getProvider", { module, strategy }));

let provider: IMailerService;
switch (strategy) {
  case "console-log":
    provider = new ConsoleLogService();
    break;
  case "mailtrap":
    provider = new MailtrapService();
    break;
  default:
    throw new Error(t("console.noProvider", { module, strategy }));
}

export { provider as mailerService };

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
