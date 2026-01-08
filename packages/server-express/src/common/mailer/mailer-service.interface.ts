export type MailerStrategy = "console-log" | "mailtrap";

export interface IMail {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface IMailerService {
  send(mail: IMail): Promise<void>;
}
