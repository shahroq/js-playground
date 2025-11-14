import type { ResponseFormatter } from "./types";

export class JsonApiFormatter implements ResponseFormatter {
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
}
