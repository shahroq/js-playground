import type { E } from "../app-error/app-error";
import type { AppEnvelope } from "./app-envelope.interface";

type JSonsApiFormat = {};

export class JsonApi implements AppEnvelope {
  create(error: E, data: any = null) {
    if (!error) return { data };

    // handle error responses
    const statusCode = error.meta.statusCode;
    const details = error.meta.details;

    return {
      errors: [
        {
          status: statusCode?.toString(),
          title: error.message,
          ...(details ? { detail: details } : {}),
        },
      ],
    };
  }

  /*
  success(data: any) {
    return { data };
  }

  fail(data: any) {
    return {
      errors: [data],
    };
  }

  error(message: string, code = 500, data: any = null) {
    return {
      errors: [
        {
          status: code.toString(),
          title: message,
          detail: data,
        },
      ],
    };
  }
    */
}
