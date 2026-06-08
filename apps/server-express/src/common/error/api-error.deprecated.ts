import type { AppErrorProps } from "./types";

// custom error for this app (deprecated implementation)
export class ApiError extends Error {
  public meta: AppErrorProps & {
    isOperational: boolean;
  };

  constructor(message: string, meta: AppErrorProps = {}) {
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
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  // Static factory methods for common errors
  static badRequest(
    message: string = "Bad Request",
    meta?: Omit<AppErrorProps, "statusCode">
  ): ApiError {
    const statusCode = 400;
    return new ApiError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      code: "ERR_VALID",
      details: meta?.details,
    });
  }

  static unauthorized(
    message: string = "Unauthorized",
    meta?: Omit<AppErrorProps, "statusCode">
  ): ApiError {
    const statusCode = 401;
    return new ApiError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      code: "ERR_AUTH",
      details: meta?.details,
    });
  }

  static forbidden(
    message: string = "Forbidden",
    meta?: Omit<AppErrorProps, "statusCode">
  ): ApiError {
    const statusCode = 403;
    return new ApiError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      code: "ERR_AUTH",
      details: meta?.details,
    });
  }

  static notFound(
    message: string = "Resource not found",
    meta?: Omit<AppErrorProps, "statusCode">
  ): ApiError {
    const statusCode = 404;
    return new ApiError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      code: "ERR_NF",
      details: meta?.details,
    });
  }

  static conflict(
    message: string = "Conflict",
    meta?: Omit<AppErrorProps, "statusCode">
  ): ApiError {
    const statusCode = 409;
    return new ApiError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      code: "ERR_G",
      details: meta?.details,
    });
  }

  static unprocessableEntity(
    message: string = "Unprocessable Entity",
    meta?: Omit<AppErrorProps, "statusCode">
  ): ApiError {
    const statusCode = 422;
    return new ApiError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      code: "ERR_G",
      details: meta?.details,
    });
  }

  static tooManyRequests(
    message: string = "Too Many Requests",
    meta?: Omit<AppErrorProps, "statusCode">
  ): ApiError {
    const statusCode = 429;
    return new ApiError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      code: "ERR_G",
      details: meta?.details,
    });
  }

  static internal(
    message: string = "Internal Server Error",
    meta?: Omit<AppErrorProps, "statusCode">
  ): ApiError {
    const statusCode = 500;
    return new ApiError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? false,
      code: "ERR_INT",
      details: meta?.details,
    });
  }
}

// sample usage
/*
throw CustomError.badRequest();
throw CustomError.badRequest('Invalid input');
throw CustomError.notFound('User not found');
throw CustomError.unauthorized('Invalid token');

// Or use next():
next(CustomError.forbidden('Access denied'));
*/
