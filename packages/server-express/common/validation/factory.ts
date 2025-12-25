import type { ValidationStrategy, ValidatorHandler } from "./types";
import { joiValidatorHandler } from "./joi/joi-validator.middleware.ts";
import { zodValidatorHandler } from "./zod/zod-validator.middleware.ts";
import { expressValidatorHandler } from "./express-validator/express-validator.middleware.ts";
import { t } from "@/common/container.ts";

let handler = null;
const adapter = "validation";

export function validatorHandlerFactory(
  strategy: ValidationStrategy
): ValidatorHandler {
  console.log(t("console.getAdapter", { adapter, strategy }));

  switch (strategy) {
    case "express-validator":
      handler = expressValidatorHandler;
      break;
    case "joi":
      handler = joiValidatorHandler;
      break;
    case "zod":
      handler = zodValidatorHandler;
      break;
    default:
      throw new Error(t("console.noAdapter", { adapter, strategy }));
  }

  return handler;
}
