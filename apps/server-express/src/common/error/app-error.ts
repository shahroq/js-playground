import createError, {
  HttpError as HttpErrorBase,
  isHttpError,
} from "http-errors";
import type { AppErrorProps, E, ErrorCode, ErrorDetail } from "./types";

// Our public AppError class (what the rest of the app uses)
export class AppError extends Error implements AppErrorProps {
  public statusCode: number;
  public status: number;
  public isOperational?: boolean;
  public code?: ErrorCode;
  public expose?: boolean;
  public publicMessage?: string;
  public details?: ErrorDetail[];
  public headers?: Record<string, string>;

  constructor(message?: string, properties?: AppErrorProps) {
    super(message);

    this.statusCode = properties?.statusCode ?? properties?.status ?? 500;
    this.status = this.statusCode;
    this.isOperational = properties?.isOperational;
    this.code = properties?.code;
    this.expose = properties?.expose ?? this.status < 500; // Default expose for client errors
    this.publicMessage = properties?.publicMessage;
    this.details = properties?.details;
    this.headers = properties?.headers;

    // Copy any additional properties
    if (properties) Object.assign(this, properties);

    // Preserve proper stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  // Factory method to create specific HTTP errors (mirrors http-errors constructors)
  static create(
    status: number,
    message?: string,
    properties?: AppErrorProps
  ): AppError {
    const err = createError(status, message, properties);
    return AppError.fromHttpError(err);
  }

  // Specific constructors (e.g., AppError.NotFound())
  static BadRequest(message?: string, props?: AppErrorProps) {
    return this.create(400, message ?? "Bad Request", props ?? {});
  }

  static Unauthorized(message?: string, props?: AppErrorProps) {
    return this.create(401, message ?? "Unauthorized", props ?? {});
  }

  static Forbidden(message?: string, props?: AppErrorProps) {
    return this.create(403, message ?? "Forbidden", props ?? {});
  }

  static NotFound(message?: string, props?: AppErrorProps) {
    return this.create(404, message ?? "Not Found", props ?? {});
  }

  static InternalServerError(message?: string, props?: AppErrorProps) {
    return this.create(500, message ?? "Internal Server Error", props ?? {});
  }

  // add more as needed: https://github.com/jshttp/http-errors
  // ...

  // Helper to convert any http-errors instance to AppError
  private static fromHttpError(err: HttpErrorBase): AppError {
    const appErr = new AppError(err.message, err);
    appErr.status = err.status ?? err.statusCode ?? 500;
    appErr.statusCode = appErr.status;
    appErr.expose = err.expose ?? appErr.status < 500;
    appErr.headers = (err as any).headers;
    return appErr;
  }

  // Type guard for checking if an error is an AppError
  static isAppError(err: E): err is AppError {
    return (
      err instanceof AppError || (isHttpError(err) && err instanceof Error)
    );
  }

  static getMessage(err: E): string {
    if (err instanceof Error) {
      return err?.publicMessage ?? err.message;
    }
    if (err && typeof err === "object" && "message" in err) {
      return String(err.message);
    }
    if (typeof err === "string") {
      return err;
    }
    return "Internal Server Error";
  }
}
