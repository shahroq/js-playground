import winston from "winston";
import { config } from "@/common/container";
import type { ILoggerService } from "../logger-service.interface";

export class WinstonService implements ILoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: config.logger.level,
      // format: winston.format.json(),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        // new winston.transports.File({ filename: 'app.log' })
      ],
    });
  }

  debug(message: string, meta?: unknown): void {
    this.logger.debug(message, meta);
  }

  info(message: string, meta?: unknown): void {
    this.logger.info(message, meta);
  }

  warn(message: string, meta?: unknown): void {
    this.logger.warn(message, meta);
  }

  error(message: string, meta?: unknown): void {
    this.logger.error(message, meta);
  }
}
