export type E = AppError | Error | null;

export type ErrorCode =
  | "ERR_NF"
  | "ERR_VALID"
  | "ERR_AUTH"
  | "ERR_INT"
  | "ERR_G";

export type ErrorDetail = {
  path: string;
  message: string;
  type?: string;
};

export type ErrorMeta = {
  statusCode?: number;
  isOperational?: boolean; // The isOperational flag helps distinguish between expected errors (like validation failures) and unexpected programming errors (like null pointer exceptions).
  details?: ErrorDetail[]; // keep details of validation errors

  __code?: string; // app-defined codes
};

export default class AppError extends Error {
  public meta: ErrorMeta & {
    isOperational: boolean;
  };

  constructor(message: string, meta: ErrorMeta = {}) {
    super(message);

    this.meta = {
      ...meta,
      // set required fields, if not provided
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
    meta?: Omit<ErrorMeta, "statusCode">
  ): AppError {
    const statusCode = 400;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      details: meta?.details,
    });
  }

  static unauthorized(
    message: string = "Unauthorized",
    meta?: Omit<ErrorMeta, "statusCode">
  ): AppError {
    const statusCode = 401;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      details: meta?.details,
    });
  }

  static forbidden(
    message: string = "Forbidden",
    meta?: Omit<ErrorMeta, "statusCode">
  ): AppError {
    const statusCode = 403;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      details: meta?.details,
    });
  }

  static notFound(
    message: string = "Resource not found",
    meta?: Omit<ErrorMeta, "statusCode">
  ): AppError {
    const statusCode = 404;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      details: meta?.details,
    });
  }

  static conflict(
    message: string = "Conflict",
    meta?: Omit<ErrorMeta, "statusCode">
  ): AppError {
    const statusCode = 409;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      details: meta?.details,
    });
  }

  static unprocessableEntity(
    message: string = "Unprocessable Entity",
    meta?: Omit<ErrorMeta, "statusCode">
  ): AppError {
    const statusCode = 422;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      details: meta?.details,
    });
  }

  static tooManyRequests(
    message: string = "Too Many Requests",
    meta?: Omit<ErrorMeta, "statusCode">
  ): AppError {
    const statusCode = 429;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? true,
      details: meta?.details,
    });
  }

  static internal(
    message: string = "Internal Server Error",
    meta?: Omit<ErrorMeta, "statusCode">
  ): AppError {
    const statusCode = 500;
    return new AppError(message, {
      statusCode,
      isOperational: meta?.isOperational ?? false,
      details: meta?.details,
    });
  }
}

// sample usage
/*
throw AppError.badRequest('Invalid input');
throw AppError.notFound('User not found');
throw AppError.unauthorized('Invalid token');

// Or use next():
next(AppError.forbidden('Access denied'));
*/
