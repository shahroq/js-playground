import { config, t } from "@/common/container.ts";
import type { ILoggerService } from "./logger-service.interface";
import { ConsoleLogService } from "./providers/console-log.service";
import { WinstonService } from "./providers/winston.service";

const module = "logger service";
const strategy = config.logger.strategy;

console.log(t("console.getProvider", { module, strategy }));

let provider: ILoggerService;
switch (strategy) {
  case "console-log":
    provider = new ConsoleLogService();
    break;
  case "winston":
    provider = new WinstonService();
    break;
  default:
    throw new Error(t("console.noProvider", { module, strategy }));
}

export { provider as loggerService };
