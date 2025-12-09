import type { E } from "../error/types";
import { isAppError } from "../container";
import type { Envelope } from "./envelope.interface";

type JsonApiErrorObject = {
  title: string;
  code?: number | string;
  meta?: any;
};

type JsonApiFormat =
  | { data: any } // success
  | { errors: JsonApiErrorObject[] }; // fail or error

export class JsonApiEnvelope implements Envelope {
  constructor(
    private readonly _error?: E | null,
    private readonly _data?: any
  ) {}

  get data() {
    return this._data;
  }

  get error() {
    return this._error;
  }

  build(): JsonApiFormat {
    if (!this.error) {
      return this.formatSuccess();
    }

    if (isAppError(this.error)) {
      return this.formatFail();
    }

    return this.formatError();
  }

  private formatSuccess(): { data: any } {
    return {
      data: this.data,
    };
  }

  private formatFail(): { errors: JsonApiErrorObject[] } {
    const appErr = this.error!;
    return {
      errors: [
        {
          title: appErr.message,
          ...(appErr.meta?.code && { code: appErr.meta.code }),
          ...(appErr.meta && { meta: appErr.meta }),
        },
      ],
    };
  }

  private formatError(): { errors: JsonApiErrorObject[] } {
    return {
      errors: [
        {
          title: this.error?.message ?? "Internal Server Error",
        },
      ],
    };
  }
}
