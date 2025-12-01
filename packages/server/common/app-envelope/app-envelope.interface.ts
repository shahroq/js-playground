import type { AppError } from "../container";

export type AppEnvelopeStrategy = "jsend" | "json-api";

export interface AppEnvelope {
  create(error: AppError | null, data?: any): any;
}
