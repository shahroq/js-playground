import type AppError from "@/common/error/app-error";

export type ResponseFormatStrategy = "jsend" | "json-api";

export interface ResponseFormatter {
  format(error: AppError | null, data?: any): any;
}
