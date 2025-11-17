import type { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import AppError, { type ErrorDetail } from "@/core/app-error.ts";
import type { Action, ValidatorMiddleware } from "../types.ts";
import { schemas } from "./schema.ts";
import Joi from "joi";

export const joiValidateMiddleware: ValidatorMiddleware = (action: Action) => {
  const schema = get(schemas, action);
  if (!schema) throw new AppError(`Schema not found for action: ${action}`);

  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validationPromises: Promise<any>[] = [];

      if ("body" in schema && schema.body)
        validationPromises.push(
          schema.body.validateAsync(req.body, { abortEarly: false })
        );

      if ("query" in schema && schema.query)
        validationPromises.push(
          schema.query.validateAsync(req.query, { abortEarly: false })
        );

      if ("params" in schema && schema.params)
        validationPromises.push(
          schema.params.validateAsync(req.params, { abortEarly: false })
        );

      await Promise.all(validationPromises);
      next();
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        const details = getErrorDetails(error);
        return next(AppError.badRequest("Validation failed.", { details }));
      }
      next(error);
    }
  };
};

const getErrorDetails = (error: Joi.ValidationError): ErrorDetail[] => {
  const details = error.details.map((detail) => ({
    path: detail.path.map((p) => String(p)).join("."),
    message: detail.message,
    type: detail.type,
  }));

  return details;
};
