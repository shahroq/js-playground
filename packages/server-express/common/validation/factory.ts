import type { ValidatorHandler, ValidationStrategy } from "./types";
import { joiValidatorHandler } from "./joi/joi-validator.middleware.ts";
import { zodValidatorHandler } from "./zod/zod-validator.middleware.ts";
import { expressValidatorHandler } from "./express-validator/express-validator.middleware.ts";
import { config } from "@/common/container.ts";

// Factory function to get validation middleware
export function getValidatorHandler(): ValidatorHandler {
  const strategy = config.validation_strategy as ValidationStrategy;
  console.log(`⚙️  Getting middleware for validation strategy (${strategy})`);

  switch (strategy) {
    case "express-validator":
      return expressValidatorHandler;
    case "joi":
      return joiValidatorHandler;
    case "zod":
      return zodValidatorHandler;
    default:
      throw new Error(`Unsupported validation strategy: ${strategy}`);
  }
}
