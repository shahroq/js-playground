import { config } from "@/common/container";
import type { IMail, IMailerService } from "../mailer-service.interface";

export class ConsoleLogService implements IMailerService {
  constructor() {}

  async send(mail: IMail) {
    const normMail = {
      from: `${config.app_name} <${config.mailer.admin_email}>`,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    };

    console.log(`Mail Sent:`);
    console.log(normMail);
  }
}
