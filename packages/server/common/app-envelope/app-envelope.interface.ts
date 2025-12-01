import type AppError from "@/common/app-error/app-error";

export type AppEnvelopeStrategy = "jsend" | "json-api";

export interface AppEnvelope {
  create(error: AppError | null, data?: any): any;
}
