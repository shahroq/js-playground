import { t } from "@/common/container.ts";
import { ConsoleLogAdapter } from "./console-log.adapter";
import { MailtrapAdapter } from "./mailtrap.adapter";
import type { MailerStrategy } from "./mailer.interface";

let instance = null;
const adapter = "mailer";

export function mailerAdapterFactory(strategy: MailerStrategy) {
  console.log(t("console.getAdapter", { adapter, strategy }));

  switch (strategy) {
    case "console-log":
      instance = new ConsoleLogAdapter();
      break;
    case "mailtrap":
      instance = new MailtrapAdapter();
      break;
    default:
      throw new Error(t("console.noAdapter", { adapter, strategy }));
  }

  return instance;
}

export function resetMailer(): void {
  instance = null;
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
