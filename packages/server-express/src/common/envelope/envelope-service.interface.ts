import type { E } from "../error/types";

export type EnvelopeStrategy = "jsend" | "json-api";

/**
 * Represents a service responsible solely for packaging data into a specific format.
 *
 * This interface does **not** concern itself with HTTP details such as status codes,
 * headers, or responses. Its sole responsibility is to structure `data` (and optionally `error`)
 * in a consistent way and provide a `toJSON()` method for serialization.
 */
export interface IEnvelopeService {
  error?: E | null;
  data?: any;

  toJSON(): any;
}
