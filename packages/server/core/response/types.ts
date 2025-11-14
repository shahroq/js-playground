export type ResponseFormatStrategy = "jsend" | "json-api";

export interface ResponseFormatter {
  success(data: any): any;
  fail(data: any): any;
  error(message: string, code?: number, data?: any): any;
}
