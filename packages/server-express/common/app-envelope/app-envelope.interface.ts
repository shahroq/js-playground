import type { E } from "../app-error/types";

export type AppEnvelopeStrategy = "jsend" | "json-api";

export interface AppEnvelope {
  create(error: E, data?: any): any;
}
