import config from "@/core/config.ts";
import type { ValidateMiddleware, ValidationStrategy } from "./types.ts";
import { joiValidateMiddleware } from "./joi/joi-validate-middleware.ts";
import { zodValidateMiddleware } from "./zod/zod-validate-middleware.ts";
import { expressValidatorValidateMiddleware } from "./express-validator/express-validator-validation-middleware.ts";

// Factory function to get validation middleware
function getValidateMiddleware(): ValidateMiddleware {
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
