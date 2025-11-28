import type AppError from "@/common/app-error/app-error";

export type AppResponseStrategy = "jsend" | "json-api";

export interface AppResponse {
  format(error: AppError | null, data?: any): any;
}
