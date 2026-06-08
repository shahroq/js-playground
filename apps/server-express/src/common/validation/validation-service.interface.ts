import type { Request } from "express";
// import type { ErrorDetail } from "@/common/error/types.js";
import type { ValidationAction } from "./types";

export interface IValidationService {
  validate(req: Request, action: ValidationAction): Promise<void>;
  // getErrorDetails(error: any): ErrorDetail[];
  // getSchema(action: string): any;
}
