import { AppError } from "@/common/container";
import type { IEnvelopeService } from "../envelope-service.interface";
import type { E } from "../../error/types";

type PlainStatus = "success" | "error";

export class PlainService implements IEnvelopeService {
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

  toJSON() {
    const status = this.getStatus();

    if (status === "success") return this.formatSuccess();
    return this.formatError();
  }

  private getStatus(): PlainStatus {
    if (!this.error) return "success";
    return "error";
  }

  private formatSuccess() {
    return this.data;
  }

  private formatError() {
    return {
      message: AppError.getMessage(this.error),
      ...(this.error?.code && { code: this.error.code }),
      ...(this.error?.details && { details: this.error.details }),
    };
  }
}
