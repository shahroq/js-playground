import { AppError } from "./app-error";
import type { E } from "./types";

/**
 * Type guard for AppError
 */
export function isAppError(error: E): error is AppError {
  return (
    error instanceof AppError &&
    "meta" in error &&
    typeof error?.meta?.statusCode === "number"
  );
}

export function getErrorMessage(error: E): string {
  if (error instanceof Error) {
    return error?.meta?.publicMessage ?? error.message;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  if (typeof error === "string") {
    return error;
  }
  return "Internal Server Error";
}
