import { Injectable } from '@nestjs/common';
import { IEnvelope } from './envelope.interface';

type JSendStatus = 'success' | 'fail' | 'error';

type JSendSuccess = {
  status: 'success';
  data: any;
};

type JSendFail = {
  status: 'fail';
  data: any;
};

type JSendError = {
  status: 'error';
  message: string;
  code?: number;
  data?: any;
};

type JSendFormat = JSendSuccess | JSendFail | JSendError;

@Injectable()
export class JSendAdapter implements IEnvelope {
  constructor(
    private readonly _error: Error | null,
    private readonly _data: any,
  ) {}

  private get error(): Error | null {
    return this._error;
  }

  private get data(): any {
    return this._data;
  }

  toJSON(): JSendFormat {
    const status = this.getStatus();

    if (status === 'success') return this.formatSuccess();
    if (status === 'fail') return this.formatFail();
    return this.formatError();
  }

  private getStatus(): JSendStatus {
    if (!this.error) return 'success';
    return 'error';
  }

  private formatSuccess(): JSendSuccess {
    return {
      status: 'success',
      data: this.data,
    };
  }

  private formatFail(): JSendFail {
    return {
      status: 'fail',
      data: {
        message: this?.error?.message ?? 'Fail: Internal Server Error!!!',
      },
    };
  }

  private formatError(): JSendError {
    return {
      status: 'error',
      message: this?.error?.message ?? 'Error: Internal Server Error!!!',
    };
  }
}
