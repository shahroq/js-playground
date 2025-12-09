import type { ErrorMetaData, ErrorDetail, ErrorCode, E } from "./types";

export default class AppError extends Error {
  public meta: ErrorMetaData & {
    isOperational: boolean;
  };

  constructor(message: string, meta: ErrorMetaData = {}) {
    super(message);

    this.meta = {
      ...meta,
      // set required/default data, if not provided
      statusCode: meta.statusCode ?? 500,
      isOperational: meta.isOperational ?? true,
    };

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor);

    // Set the prototype explicitly
    Object.setPrototypeOf(this, AppError.prototype);
  }

  // Static factory methods for common errors
  static badRequest(
    message: string = "Bad Request",
    meta?: Omit<ErrorMetaData, "statusCode">
  ): AppError {
    const statusCode = 400;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      code: "ERR_VALID",
      details: meta?.details,
    });
  }

  static unauthorized(
    message: string = "Unauthorized",
    meta?: Omit<ErrorMetaData, "statusCode">
  ): AppError {
    const statusCode = 401;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      code: "ERR_AUTH",
      details: meta?.details,
    });
  }

  static forbidden(
    message: string = "Forbidden",
    meta?: Omit<ErrorMetaData, "statusCode">
  ): AppError {
    const statusCode = 403;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      code: "ERR_AUTH",
      details: meta?.details,
    });
  }

  static notFound(
    message: string = "Resource not found",
    meta?: Omit<ErrorMetaData, "statusCode">
  ): AppError {
    const statusCode = 404;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      code: "ERR_NF",
      details: meta?.details,
    });
  }

  static conflict(
    message: string = "Conflict",
    meta?: Omit<ErrorMetaData, "statusCode">
  ): AppError {
    const statusCode = 409;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      code: "ERR_G",
      details: meta?.details,
    });
  }

  static unprocessableEntity(
    message: string = "Unprocessable Entity",
    meta?: Omit<ErrorMetaData, "statusCode">
  ): AppError {
    const statusCode = 422;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      code: "ERR_G",
      details: meta?.details,
    });
  }

  static tooManyRequests(
    message: string = "Too Many Requests",
    meta?: Omit<ErrorMetaData, "statusCode">
  ): AppError {
    const statusCode = 429;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      code: "ERR_G",
      details: meta?.details,
    });
  }

  static internal(
    message: string = "Internal Server Error",
    meta?: Omit<ErrorMetaData, "statusCode">
  ): AppError {
    const statusCode = 500;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? false,
      code: "ERR_INT",
      details: meta?.details,
    });
  }
}

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

// sample usage
/*
throw AppError.badRequest();
throw AppError.badRequest('Invalid input');
throw AppError.notFound('User not found');
throw AppError.unauthorized('Invalid token');

// Or use next():
next(AppError.forbidden('Access denied'));
*/
