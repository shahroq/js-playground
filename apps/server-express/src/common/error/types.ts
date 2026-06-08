import type { AppError } from "./app-error";

export type E = AppError | Error;

export type ErrorCode =
  | "ERR_NF"
  | "ERR_VALID"
  | "ERR_AUTH"
  | "ERR_INT"
  | "ERR_UNKNOWN"
  | "ERR_G";

export type ErrorDetail = {
  path: string;
  message: string;
  type?: string;
};

export interface AppErrorProps {
  statusCode?: number;
  status?: number; // the status code of the error, mirroring statusCode for general compatibility

  // The isOperational flag helps distinguish between expected errors (like validation failures) and unexpected programming errors (like null pointer exceptions).
  isOperational?: boolean;
  // app-defined codes
  code?: ErrorCode;

  // first message to show to visitors if exists (in case default error msg exposes too much, like orm case)
  expose?: boolean;
  publicMessage?: string;

  // keep details of validation errors
  details?: ErrorDetail[];

  headers?: Record<string, string>;
  [key: string]: any;
}
