import type { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import AppError, { type ErrorDetail } from "@/common/app-error.ts";
import type { Action, ValidatorMiddleware } from "../types.ts";
import { chains } from "./chain.ts";
import {
  validationResult,
  type ValidationChain,
  type Result,
} from "express-validator";

export const expressValidatorValidateMiddleware: ValidatorMiddleware = (
  action: Action
) => {
  const chain = get(chains, action);
  if (!chain) throw new AppError(`Chain not found for action: ${action}`);

  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    // Run all validations
    await Promise.all(
      chain.map((validation: ValidationChain) => validation.run(req))
    );

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const details = getErrorDetails(errors);

      return next(AppError.badRequest("Validation failed.", { details }));
    }

    next();
  };
};

const getErrorDetails = (errors: Result): ErrorDetail[] => {
  const details = errors.array().map((error) => ({
    path: "path" in error ? error.path : "",
    message: error.msg,
    type: error.type,
  }));

  return details;
};
