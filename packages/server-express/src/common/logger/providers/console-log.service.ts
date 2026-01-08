import type { ILoggerService } from "../logger-service.interface";

export class ConsoleLogService implements ILoggerService {
  debug(message: string, meta?: unknown): void {
    console.debug(this.format("DEBUG", message, meta));
  }

  info(message: string, meta?: unknown): void {
    console.info(this.format("INFO", message, meta));
  }

  warn(message: string, meta?: unknown): void {
    console.warn(this.format("WARN", message, meta));
  }

  error(message: string, meta?: unknown): void {
    console.error(this.format("ERROR", message, meta));
  }

  private format(level: string, message: string, meta?: unknown): string {
    const timestamp = new Date().toISOString();

    if (meta === undefined) {
      return `[${timestamp}] ${level}: ${message}`;
    }

    return `[${timestamp}] ${level}: ${message} ${JSON.stringify(meta)}`;
  }
}
