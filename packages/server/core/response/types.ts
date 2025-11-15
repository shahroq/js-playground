export type ResponseFormatStrategy = "jsend" | "json-api";

/**
 *
 */
export interface ResponseFormatter {
  success(data: any): any;
  fail(data: any): any;
  error(message: string, code?: number, data?: any): any;
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
