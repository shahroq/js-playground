import config from "@/common/config.ts";
import type { ValidatorMiddleware, ValidationStrategy } from "./types";
import { joiValidatorMiddleware } from "./joi/joi-validator-middleware.ts";
import { zodValidatorMiddleware } from "./zod/zod-validator-middleware.ts";
import { expressValidatorMiddleware } from "./express-validator/express-validator-middleware.ts";

// Factory function to get validation middleware
export function getValidatorMiddleware(): ValidatorMiddleware {
  const strategy = config.validation_strategy as ValidationStrategy;
  console.log(`⚙️  Getting middleware for validation strategy (${strategy})`);

  switch (strategy) {
    case "express-validator":
      return expressValidatorMiddleware;
    case "joi":
      return joiValidatorMiddleware;
    case "zod":
      return zodValidatorMiddleware;
    default:
      throw new Error(`Unsupported validation strategy: ${strategy}`);
  }
}

export const validate = getValidatorMiddleware();
