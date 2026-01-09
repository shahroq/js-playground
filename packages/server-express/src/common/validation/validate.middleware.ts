import type { Request, Response, NextFunction } from "express";
import { AppError, validationService } from "@/common/container";
import type { ValidationAction, ValidatorHandler } from "./types";

export const validate: ValidatorHandler = (action: ValidationAction) => {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    /*
    // no need: errors are thrown in service?
    try {
      validationService.validate(req, action);
      // next();
    } catch (error) {
      next(error);
    }
    */

    await validationService.validate(req, action);
    next();
  };
};
