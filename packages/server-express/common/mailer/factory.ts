import { config } from "@/common/container.ts";
import { ConsoleLogMailer } from "./console-log-adapter";
import { MailtrapMailer } from "./mailtrap-adapter";

let mailer = null;

export function getMailer() {
  const format = config.mailer_strategy || "console-log";

  console.log(`⚙️  Getting mailer adapter for strategy: (${format})`);

  switch (format) {
    case "console-log":
      mailer = new ConsoleLogMailer();
      break;
    case "mailtrap":
      mailer = new MailtrapMailer();
      break;
    default:
      throw new Error(`Unsupported mailer format: ${format}`);
  }

  return mailer;
}

export function resetMailer(): void {
  mailer = null;
}

/*
// sample usage
const mail = {
  to: config.mailer_admin_email,
  subject: "Sandbox",
  text: "Sent from sand box",
};
await mailer.send(mail).catch((error) => new AppError("Mailtrap Error."));
res.json("mail sent!");
*/
