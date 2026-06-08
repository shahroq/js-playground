export type LoggerStrategy = "console-log" | "winston";

// https://datatracker.ietf.org/doc/html/rfc5424
export enum LogLevel {
  EMERG = "emerg",
  ALERT = "alert",
  CRIT = "crit",
  ERROR = "error",
  WARNING = "warning",
  NOTICE = "notice",
  INFO = "info",
  DEBUG = "debug",
}

export interface ILoggerService {
  debug(message: string, meta?: unknown): void;
  info(message: string, meta?: unknown): void;
  warn(message: string, meta?: unknown): void;
  error(message: string, meta?: unknown): void;
}
