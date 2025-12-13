import { config } from "@/common/container";

import type { IMail, IMailer } from "./mailer.interface";

export class ConsoleLogMailer implements IMailer {
  constructor() {}

  async send(mail: IMail) {
    const normMail = {
      from: `${config.app_name} <${config.mailer_admin_email}>`,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    };

    console.log(`Mail Sent:`);
    console.log(normMail);
  }
}
