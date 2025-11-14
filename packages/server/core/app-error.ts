export type ErrorDetail = {
  path: string;
  message: string;
  type?: string;
};

export default class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: string;
  public readonly isOperational: boolean; // The isOperational flag helps distinguish between expected errors (like validation failures) and unexpected programming errors (like null pointer exceptions).
  public readonly details: ErrorDetail[]; // keep details of validation errors

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    details: ErrorDetail[] | null = null
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;

    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor);

    // Set the prototype explicitly
    Object.setPrototypeOf(this, AppError.prototype);
  }

  // Static factory methods for common errors
  static badRequest(
    message: string = "Bad Request",
    isOperational = true,
    details = null
  ): AppError {
    return new AppError(message, 400, isOperational, details);
  }

  static unauthorized(message: string = "Unauthorized"): AppError {
    return new AppError(message, 401);
  }

  static forbidden(message: string = "Forbidden"): AppError {
    return new AppError(message, 403);
  }

  static notFound(message: string = "Resource not found"): AppError {
    return new AppError(message, 404);
  }

  static conflict(message: string = "Conflict"): AppError {
    return new AppError(message, 409);
  }

  static unprocessableEntity(
    message: string = "Unprocessable Entity"
  ): AppError {
    return new AppError(message, 422);
  }

  static tooManyRequests(message: string = "Too Many Requests"): AppError {
    return new AppError(message, 429);
  }

  static internal(message: string = "Internal Server Error"): AppError {
    return new AppError(message, 500, false);
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
