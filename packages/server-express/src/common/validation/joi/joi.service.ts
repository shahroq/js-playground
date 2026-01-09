import type { Request } from "express";
import { get } from "lodash";
import Joi from "joi";
import { AppError } from "@/common/container";
import type { ValidationAction } from "../types.ts";
import type { IValidationService } from "../validation-service.interface";
import type { ErrorDetail } from "@/common/error/types";
import { schemas } from "./schema.ts";

export class JoiService implements IValidationService {
  async validate(req: Request, action: ValidationAction): Promise<void> {
    const schema = this.getSchema(action);

    const validationPromises: Promise<any>[] = [];

    try {
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
    } catch (error) {
      const details =
        error instanceof Joi.ValidationError ? this.getErrorDetails(error) : [];
      throw AppError.BadRequest("Validation failed.", { details });
    }
  }

  private getErrorDetails = (error: Joi.ValidationError): ErrorDetail[] => {
    const details = error.details.map((detail) => ({
      path: detail.path.map((p) => String(p)).join("."),
      message: detail.message,
      type: detail.type,
    }));

    return details;
  };

  private getSchema(action: string) {
    const schema = get(schemas, action);

    if (!schema)
      throw AppError.InternalServerError(`Invalid action: ${action}`);

    return schema;
  }
}
