import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { config } from "@/common/container";

import type { IMail, IMailer } from "./mailer.interface";

export class MailtrapAdapter implements IMailer {
  private transporter;

  constructor() {
    const options: SMTPTransport.Options = {
      host: config.mailer.host,
      port: config.mailer.port,
      auth: {
        user: config.mailer.username,
        pass: config.mailer.password,
      },
    };
    this.transporter = nodemailer.createTransport(options);
  }

  async send(mail: IMail) {
    const normMail = {
      from: `${config.app_name} <${config.mailer.admin_email}>`,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    };

    await this.transporter.sendMail(normMail);
  }
}
