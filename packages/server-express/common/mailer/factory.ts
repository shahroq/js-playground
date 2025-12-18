import { config, t } from "@/common/container.ts";
import { ConsoleLogAdapter } from "./console-log.adapter";
import { MailtrapAdapter } from "./mailtrap.adapter";

let mailer = null;

export function getMailer() {
  const adapter = "mailer";
  const strategy = config.mailer.strategy || "console-log";

  console.log(t("console.getAdapter", { adapter, strategy }));

  switch (strategy) {
    case "console-log":
      mailer = new ConsoleLogAdapter();
      break;
    case "mailtrap":
      mailer = new MailtrapAdapter();
      break;
    default:
      throw new Error(t("console.noAdapter", { adapter, strategy }));
  }

  return mailer;
}

export function resetMailer(): void {
  mailer = null;
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
