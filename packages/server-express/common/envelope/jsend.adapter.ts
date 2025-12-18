import { isAppError } from "@/common/container";
import type { IEnvelope } from "./envelope.interface";
import type { E } from "../error/types";
import { getErrorMessage } from "../error/app-error";

type JSendStatus = "success" | "fail" | "error";

type JSendSuccess = {
  status: "success";
  data: any;
};

type JSendFail = {
  status: "fail";
  data: any;
};

type JSendError = {
  status: "error";
  message: string;
  code?: number;
  data?: any;
};

type JSendFormat = JSendSuccess | JSendFail | JSendError;

export class JSendAdapter implements IEnvelope {
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

  build(): JSendFormat {
    const status = this.getStatus();
    let envelope;

    switch (status) {
      case "success":
        envelope = this.formatSuccess();
        break;
      case "fail":
        envelope = this.formatFail();
        break;
      case "error":
        envelope = this.formatError();
        break;
    }

    return envelope;
  }

  private formatSuccess(): JSendSuccess {
    return {
      status: "success",
      data: this.data,
    };
  }

  private formatFail(): JSendFail {
    return {
      status: "fail",
      data: {
        message: getErrorMessage(this.error),
        ...(this.error?.meta?.code && { code: this.error.meta.code }),
        ...(this.error?.meta?.details && { details: this.error.meta.details }),
      },
    };
  }

  private formatError(): JSendError {
    return {
      status: "error",
      message: getErrorMessage(this.error),
      ...(this.error?.code && { code: this.error.code }),
    };
  }

  private getStatus(): JSendStatus {
    if (!this.error) return "success";
    if (isAppError(this.error)) return "fail";
    return "error";
  }
}

/*
1. success
Meaning: The API request was processed successfully, and the response contains the requested data or confirmation.
HTTP status codes often used: 200 OK, 201 Created, 204 No Content
Use cases:
  Fetching a resource successfully (GET /users/123)
  Creating a new resource (POST /users)
  Updating a resource (PUT /users/123)
Key point: The operation completed as intended.
Structure example:
  {
    "status": "success",
    "data": {
      "id": 123,
      "name": "John Doe"
    }
  }

2. fail
Meaning: The request was valid, but the operation could not be completed due to a client-side problem (like invalid input).
HTTP status codes often used: 400 Bad Request, 422 Unprocessable Entity  
Use cases:
  Missing required fields in a request
  Invalid input values (e.g., string instead of integer)
  Validation errors in forms
Key point: Client made a request that is syntactically correct but semantically wrong.
Structure example:
  {
    "status": "fail",
    "data": {
      "email": "Email is required",
      "password": "Password must be at least 6 characters"
    }
  }

3. error
Meaning: Something went wrong on the server side, preventing the API from completing the request. It is not the client’s fault.
HTTP status codes often used: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable
Use cases:
  Database or service is down
  Unexpected exception in server code
  Timeout when calling an external API
Key point: These errors usually indicate a problem that the server or infrastructure needs to fix.
Structure example:
  {
    "status": "error",
    "message": "Database connection failed"
  }
*/
