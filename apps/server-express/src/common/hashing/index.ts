import { config, t } from "@/common/container";
import type { IHashingService } from "./hashing-service.interface";
import { BcryptService } from "./providers/bcrypt.service";

const module = "hashing service";
const strategy = config.hashing.strategy;

console.log(t("CONSOLE.GET_PROVIDER", { module, strategy }));

let provider: IHashingService;
switch (strategy) {
  case "bcrypt":
    provider = new BcryptService();
    break;
  default:
    throw new Error(t("CONSOLE.NO_PROVIDER", { module, strategy }));
}

export { provider as hashingService };
