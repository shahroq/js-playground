import createError from "http-errors";
import { ApiError } from "./api-error";
import type { E } from "./types";

/**
 * Type guard for AppError
 */
export function isAppError(error: E): error is ApiError {
  // instance of custom error made for this api
  const isApiError =
    error instanceof ApiError &&
    "meta" in error &&
    typeof error?.meta?.statusCode === "number";

  // inherits from the HttpError constructor of the http-errors module
  const isHttpError = createError.isHttpError(error);

  return isApiError || isHttpError;
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
