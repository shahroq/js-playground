import { Injectable } from '@nestjs/common';
import { IEnvelope } from './envelope.interface';

type JsonApiStatus = 'success' | 'fail' | 'error';

type JsonApiErrorObject = {
  title: string;
  code?: number | string;
  meta?: any;
};

type JsonApiFormat =
  | { data: any } // success
  | { errors: JsonApiErrorObject[] }; // fail or error

@Injectable()
export class JsonApiAdapter implements IEnvelope {
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

  toJSON(): JsonApiFormat {
    const status = this.getStatus();

    if (status === 'success') return this.formatSuccess();
    if (status === 'fail') return this.formatFail();
    return this.formatError();
  }

  private getStatus(): JsonApiStatus {
    if (!this.error) return 'success';
    return 'error';
  }

  private formatSuccess(): { data: any } {
    return {
      data: this.data,
    };
  }

  private formatFail(): { errors: JsonApiErrorObject[] } {
    return {
      errors: [],
    };
  }

  private formatError(): { errors: JsonApiErrorObject[] } {
    return { errors: [] };
  }
}
