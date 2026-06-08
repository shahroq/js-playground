import { config, t } from "@/common/container.ts";
import type { IMailerService } from "./mailer-service.interface";
import { ConsoleLogService } from "./providers/console-log.service";
import { MailtrapService } from "./providers/mailtrap.service";

const module = "mailer service";
const strategy = config.mailer.strategy;

console.log(t("CONSOLE.GET_PROVIDER", { module, strategy }));

let provider: IMailerService;
switch (strategy) {
  case "console-log":
    provider = new ConsoleLogService();
    break;
  case "mailtrap":
    provider = new MailtrapService();
    break;
  default:
    throw new Error(t("CONSOLE.NO_PROVIDER", { module, strategy }));
}

export { provider as mailerService };

/*
// alternative implmnt:
// ask: explain token-base DI in nest? maybe you can use one factory method for all providers
// providers are categorized based on token(APP_MAILER, APP_LOGGER, APP_VALIDATOR, etc?)
const mapper = new map(); // list of stragey to classes
function factory(startegy: MailerStrategy) {
  try {
    return new mapper[startegy]();
  } catch (error) {
    throw new Error(t("CONSOLE.NO_PROVIDER", { module, strategy }));
  }
}
const provider = factory(strategy);
*/

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
