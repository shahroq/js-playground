import type { E } from "../app-error/types";

export type AppEnvelopeStrategy = "jsend" | "json-api";

export interface Envelope {
  error?: E | null;
  data?: any;

  build(): any;
}
