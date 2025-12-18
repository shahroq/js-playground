import { config, t } from "@/common/container.ts";

import { WinstonAdapter } from "./winston.adapter";
import { ConsoleLogAdapter } from "./console-log.adapter";

let logger = null;

export function getLogger() {
  const adapter = "logger";
  const strategy = config.logger.strategy || "console-log";

  console.log(t("console.getAdapter", { adapter, strategy }));

  switch (strategy) {
    case "console-log":
      logger = new ConsoleLogAdapter();
      break;
    case "winston":
      logger = new WinstonAdapter();
      break;
    default:
      throw new Error(t("console.noAdapter", { adapter, strategy }));
  }

  return logger;
}

export function resetLogger(): void {
  logger = null;
}
