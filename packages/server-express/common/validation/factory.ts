import type { ValidatorHandler } from "./types";
import { joiValidatorHandler } from "./joi/joi-validator.middleware.ts";
import { zodValidatorHandler } from "./zod/zod-validator.middleware.ts";
import { expressValidatorHandler } from "./express-validator/express-validator.middleware.ts";
import { config, t } from "@/common/container.ts";

let validator = null;

// Factory function to get validation middleware
export function getValidatorHandler(): ValidatorHandler {
  const adapter = "validation";
  const strategy = config.validation.strategy;

  console.log(t("console.getAdapter", { adapter, strategy }));

  switch (strategy) {
    case "express-validator":
      validator = expressValidatorHandler;
      break;
    case "joi":
      validator = joiValidatorHandler;
      break;
    case "zod":
      validator = zodValidatorHandler;
      break;
    default:
      throw new Error(t("console.noAdapter", { adapter, strategy }));
  }

  return validator;
}
