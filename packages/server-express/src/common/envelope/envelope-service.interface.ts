import type { E } from "../error/types";

export type EnvelopeStrategy = "jsend" | "json-api";

export interface IEnvelopeService {
  error?: E | null;
  data?: any;

  toJSON(): any;
}
