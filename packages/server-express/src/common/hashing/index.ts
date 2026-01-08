import { config, t } from "@/common/container";
import type { IHashingService } from "./hashing-service.interface";
import { BcryptService } from "./providers/bcrypt.service";

const module = "hashing service";
const strategy = config.hashing.strategy;

console.log(t("console.getProvider", { module, strategy }));

let provider: IHashingService;
switch (strategy) {
  case "bcrypt":
    provider = new BcryptService();
    break;
  default:
    throw new Error(t("console.noProvider", { module, strategy }));
}

export { provider as hashingService };
