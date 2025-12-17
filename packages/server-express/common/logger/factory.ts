import { config } from "@/common/container.ts";
import { LogLevel } from "./logger.interface";
import { WinstonAdapter } from "./winston.adapter";
import { ConsoleLogAdapter } from "./console-log.adapter";

let logger = null;

export function getLogger() {
  const startegy = config.logging.strategy || "console-log";
  const level = config.logging.level || LogLevel.INFO;

  console.log(
    `⚙️  Getting logger adapter for strategy: (${startegy}/${level})`
  );

  switch (startegy) {
    case "console-log":
      logger = new ConsoleLogAdapter();
      break;
    case "winston":
      logger = new WinstonAdapter();
      break;
    default:
      throw new Error(`Unsupported logging startegy: ${startegy}`);
  }

  return logger;
}

export function resetLogger(): void {
  logger = null;
}
