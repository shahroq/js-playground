import type { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import AppError, { type ErrorDetail } from "@/common/app-error.ts";
import type { Action, ValidatorMiddleware } from "../types.ts";
import { schemas } from "./schema.ts";
import { ZodError } from "zod";

export const zodValidateMiddleware: ValidatorMiddleware = (action: Action) => {
  const schema = get(schemas, action);
  if (!schema) throw new AppError(`Schema not found for action: ${action}`);

  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if ("body" in schema && schema.body) schema.body.parse(req.body);
      if ("query" in schema && schema.query) schema.query.parse(req.query);
      if ("params" in schema && schema.params) schema.params.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = getErrorDetails(error);
        return next(AppError.badRequest("Validation failed.", { details }));
      }
      next(error);
    }
  };
};

const getErrorDetails = (error: ZodError): ErrorDetail[] => {
  const details = error.issues.map((issue) => ({
    path: issue.path.map((p) => String(p)).join("."),
    message: issue.message,
    type: issue.code,
  }));

  return details;
};
