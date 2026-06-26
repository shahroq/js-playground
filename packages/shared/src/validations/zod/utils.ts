import { ZodError, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  Error,
  FieldsErrors,
  ValidationResult,
  RHFValidationAdapter,
} from "../types";
import type { Task } from "../../types/types";

function mapErrorsToAr(error: ZodError): Error[] {
  return error.issues.map((i: any) => ({
    field: i.path[0]?.toString() ?? "",
    message: i.message,
  }));
}

function mapErrorsToObj(error: ZodError): FieldsErrors {
  return error.issues.reduce<FieldsErrors>((acc, cur) => {
    const fld = cur.path.join(".") || "form";

    acc[fld] ??= [];
    acc[fld].push(cur.message);

    return acc;
  }, {});
}

// validator method using zod
export function validateByZod<T>(
  schema: ZodType,
  values: T,
): ValidationResult<T> {
  const result = schema.safeParse(values);

  if (result.success) return { success: true, data: result.data, errors: [] };

  return {
    success: false,
    // errors: mapErrorsToAr(result.error)
    errors: mapErrorsToObj(result.error),
  };
}

// resolver for RHF
export const zodTaskValidation: RHFValidationAdapter<Task> = {
  rules: undefined,
  resolver: (schema: ZodType) => zodResolver(schema),
};
