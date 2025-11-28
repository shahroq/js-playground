import config from "@/common/config.ts";
import type { ValidatorMiddleware, ValidationStrategy } from "./type";
import { joiValidateMiddleware } from "./joi/joi-validate-middleware.ts";
import { zodValidateMiddleware } from "./zod/zod-validate-middleware.ts";
import { expressValidatorValidateMiddleware } from "./express-validator/express-validator-validation-middleware.ts";

// Factory function to get validation middleware
function getValidateMiddleware(): ValidatorMiddleware {
  const strategy = config.validation_strategy as ValidationStrategy;
  console.log(`⚙️  Getting middleware for validation strategy (${strategy})`);

  switch (strategy) {
    case "express-validator":
      return expressValidatorValidateMiddleware;
    case "joi":
      return joiValidateMiddleware;
    case "zod":
      return zodValidateMiddleware;
    default:
      throw new Error(`Unsupported validation strategy: ${strategy}`);
  }
}

export const validate = getValidateMiddleware();
