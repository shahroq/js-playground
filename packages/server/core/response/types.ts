import type AppError from "@/core/app-error";

export type ResponseFormatStrategy = "jsend" | "json-api";

export interface ResponseFormatter {
  format(error: AppError | null, data?: any): any;
}
