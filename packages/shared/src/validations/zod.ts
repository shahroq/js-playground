import { z, ZodError, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  Error,
  FieldsErrors,
  ValidationResult,
  RHFValidationAdapter,
} from "./types";
import type { Task } from "../types/types";

export const signInSchema = z.object({
  email: z.email("Please enter a valid email address").trim(),
  password: z.string().min(5, "Password must be at least 5 characters"),
  // .regex(/[A-Z]/, "Must contain an uppercase letter")
  // .regex(/[a-z]/, "Must contain a lowercase letter")
  // .regex(/[0-9]/, "Must contain a number")
  // .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
});

export const taskSchema = z.object({
  title: z.string().min(3, "Zod: Title must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Zod: Description must be at least 10 characters")
    .includes("@", "Zod: Description must contains @"),
  category: z.string().min(1, "Zod: Category is required").optional(),
});

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
