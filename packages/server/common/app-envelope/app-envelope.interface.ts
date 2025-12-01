import type { AppError } from "@/common/container";

export type AppEnvelopeStrategy = "jsend" | "json-api";

export interface AppEnvelope {
  create(error: AppError | null, data?: any): any;
}
