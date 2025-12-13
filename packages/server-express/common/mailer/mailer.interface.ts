import type { Awaitable } from "../types";

export type MAilerStrategy = "console-log" | "mailtrap";

export interface IMail {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface IMailer {
  send(mail: IMail): Promise<void>;
}
