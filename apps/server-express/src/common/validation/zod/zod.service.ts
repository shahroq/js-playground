import type { Request } from "express";
import { get } from "lodash";
import { ZodError } from "zod";
import { AppError } from "@/common/container";
import type { ValidationAction } from "../types.ts";
import type { IValidationService } from "../validation-service.interface";
import type { ErrorDetail } from "@/common/error/types";
import { schemas } from "./schema.ts";

export class ZodService implements IValidationService {
  async validate(req: Request, action: ValidationAction): Promise<void> {
    const schema = this.getSchema(action);

    try {
      if ("body" in schema && schema.body) schema.body.parse(req.body);
      if ("query" in schema && schema.query) schema.query.parse(req.query);
      if ("params" in schema && schema.params) schema.params.parse(req.params);
    } catch (error) {
      const details =
        error instanceof ZodError ? this.getErrorDetails(error) : [];
      throw AppError.BadRequest("Validation failed.", { details });
    }
  }

  private getErrorDetails(error: ZodError): ErrorDetail[] {
    const details = error.issues.map((issue) => ({
      path: issue.path.map((p) => String(p)).join("."),
      message: issue.message,
      type: issue.code,
    }));

    return details;
  }

  private getSchema(action: string) {
    const schema = get(schemas, action);

    if (!schema)
      throw AppError.InternalServerError(`Invalid action: ${action}`);

    return schema;
  }
}
