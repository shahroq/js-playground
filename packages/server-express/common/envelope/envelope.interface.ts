import type { E } from "../error/types";

export type EnvelopeStrategy = "jsend" | "json-api";

export interface IEnvelope {
  error?: E | null;
  data?: any;

  build(): any;
}
