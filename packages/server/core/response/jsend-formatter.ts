import type { ResponseFormatter } from "./types";

export class JSendFormatter implements ResponseFormatter {
  success(data: any) {
    return {
      status: "success",
      data,
    };
  }

  fail(data: any) {
    return {
      status: "fail",
      data,
    };
  }
  // TODO: for now, use statusCode here/define internal(app wide) codes is better
  error(message: string, code = 500, data: any = null) {
    const response: any = {
      status: "error",
      message,
    };
    if (code) response.code = code;
    if (data) response.data = data;
    return response;
  }
}
