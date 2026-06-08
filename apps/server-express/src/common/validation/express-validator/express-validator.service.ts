import type { Request } from "express";
import { get } from "lodash";
import {
  validationResult,
  type ValidationChain,
  type Result,
} from "express-validator";
import { AppError } from "@/common/container";
import type { ValidationAction } from "../types.ts";
import type { IValidationService } from "../validation-service.interface.ts";
import type { ErrorDetail } from "@/common/error/types";
import { chains } from "./chain.ts";

export class ExpressValidatorService implements IValidationService {
  async validate(req: Request, action: ValidationAction): Promise<void> {
    const chain = this.getChain(action);

    // Run all validations
    await Promise.all(
      chain.map((validation: ValidationChain) => validation.run(req))
    );

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const details = this.getErrorDetails(errors);

      throw AppError.BadRequest("Validation failed.", { details });
    }
  }

  private getErrorDetails(errors: Result): ErrorDetail[] {
    const details = errors.array().map((error) => ({
      path: "path" in error ? error.path : "",
      message: error.msg,
      type: error.type,
    }));

    return details;
  }

  private getChain(action: string) {
    const chain = get(chains, action);

    if (!chain) throw AppError.InternalServerError(`Invalid action: ${action}`);

    return chain;
  }
}
