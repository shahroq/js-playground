import { config, t } from "@/common/container.ts";
import type { ValidatorHandler } from "./types.ts";
import { joiValidatorHandler } from "./joi/joi-validator.middleware.ts";
import { zodValidatorHandler } from "./zod/zod-validator.middleware.ts";
import { expressValidatorHandler } from "./express-validator/express-validator.middleware.ts";

const module = "validation service";
const strategy = config.validation.strategy;

console.log(t("console.getProvider", { module, strategy }));

let provider: ValidatorHandler;
switch (strategy) {
  case "express-validator":
    provider = expressValidatorHandler;
    break;
  case "joi":
    provider = joiValidatorHandler;
    break;
  case "zod":
    provider = zodValidatorHandler;
    break;
  default:
    throw new Error(t("console.noProvider", { module, strategy }));
}

export { provider as validate };
