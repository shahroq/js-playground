import type { E } from "@/common/error/types";

import type { IEnvelopeService } from "../envelope-service.interface";
import { AppError } from "@/common/container";

type JsonApiStatus = "success" | "fail" | "error";

type JsonApiErrorObject = {
  title: string;
  code?: number | string;
  meta?: any;
};

type JsonApiFormat =
  | { data: any } // success
  | { errors: JsonApiErrorObject[] }; // fail or error

export class JsonApiService implements IEnvelopeService {
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

  toJSON(): JsonApiFormat {
    const status = this.getStatus();

    if (status === "success") return this.formatSuccess();
    if (status === "fail") return this.formatFail();
    return this.formatError();
  }

  private getStatus(): JsonApiStatus {
    if (!this.error) return "success";
    if (AppError.isAppError(this.error)) return "fail";
    return "error";
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
          title: AppError.getMessage(appErr),
          ...(appErr?.code && { code: appErr.code }),
          ...(appErr?.details && { meta: appErr.details }),
        },
      ],
    };
  }

  private formatError(): { errors: JsonApiErrorObject[] } {
    return {
      errors: [
        {
          title: AppError.getMessage(this.error),
        },
      ],
    };
  }
}
