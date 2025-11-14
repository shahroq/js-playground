import type { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import AppError, { type ErrorDetail } from "@/core/app-error.ts";
import type { Action, ValidateMiddleware } from "../types.ts";
import { schemas } from "./schema.ts";
import { ZodError } from "zod";

export const zodValidateMiddleware: ValidateMiddleware = (action: Action) => {
  const schema = get(schemas, action);
  if (!schema) throw new AppError(`Schema not found for action: ${action}`);

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (schema.body) {
        schema.body.parse(req.body);
      }

      if (schema.query) {
        schema.query.parse(req.query);
      }

      if (schema.params) {
        schema.params.parse(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = getErrorDetails(error);

        return next(
          AppError.badRequest("Validation failed.", true, { details })
        );
      }
      next(error);
    }
  };
};

const getErrorDetails = (error: ZodError): ErrorDetail[] => {
  const details = error.issues.map((err) => ({
    path: err.path.map((p) => String(p)),
    message: err.message,
    type: err.code,
  }));

  return details;
};
