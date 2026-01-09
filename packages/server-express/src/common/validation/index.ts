import { config, t } from "@/common/container.ts";
import type { IValidationService } from "./validation-service.interface.ts";
import { ExpressValidatorService } from "./express-validator/express-validator.service.ts";
import { JoiService } from "./joi/joi.service.ts";
import { ZodService } from "./zod/zod.service.ts";

const module = "validation service";
const strategy = config.validation.strategy;

console.log(t("console.getProvider", { module, strategy }));

let provider: IValidationService;
switch (strategy) {
  case "express-validator":
    provider = new ExpressValidatorService();
    break;
  case "joi":
    provider = new JoiService();
    break;
  case "zod":
    provider = new ZodService();
    break;
  default:
    throw new Error(t("console.noProvider", { module, strategy }));
}

export { provider as validationService };
