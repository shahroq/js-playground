import { config, t } from "@/common/container.ts";
import { WinstonAdapter } from "./winston.adapter";
import { ConsoleLogAdapter } from "./console-log.adapter";

let instance = null;

// factory: logger
export function createLogger() {
  const adapter = "logger";
  const strategy = config.logger.strategy || "console-log";

  console.log(t("console.getAdapter", { adapter, strategy }));

  switch (strategy) {
    case "console-log":
      instance = new ConsoleLogAdapter();
      break;
    case "winston":
      instance = new WinstonAdapter();
      break;
    default:
      throw new Error(t("console.noAdapter", { adapter, strategy }));
  }

  return instance;
}

export function resetLogger(): void {
  instance = null;
}
