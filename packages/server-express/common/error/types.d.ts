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

export type ErrorMetaData = {
  statusCode?: number;
  isOperational?: boolean; // The isOperational flag helps distinguish between expected errors (like validation failures) and unexpected programming errors (like null pointer exceptions).
  details?: ErrorDetail[]; // keep details of validation errors
  code?: ErrorCode; // app-defined codes
};
