import { getErrorMessage } from "../error/app-error";
import type { E } from "../error/types";
import { isAppError } from "../container";
import type { IEnvelope } from "./envelope.interface";

type JsonApiErrorObject = {
  title: string;
  code?: number | string;
  meta?: any;
};

type JsonApiFormat =
  | { data: any } // success
  | { errors: JsonApiErrorObject[] }; // fail or error

export class JsonApiAdapter implements IEnvelope {
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
          title: getErrorMessage(appErr),
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
          title: getErrorMessage(this.error),
        },
      ],
    };
  }
}
