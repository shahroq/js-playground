import type { Response, NextFunction } from "express";
import { EnvelopeService, AppError } from "@/common/container";
import type { E } from "@/common/error/types";

/**
 * envelop the response in a specified format
 */
export function envelopResponseHandler(
  _: any,
  res: Response,
  next: NextFunction
) {
  const originalJson = res.json;

  res.json = function (body) {
    const { error, data } = extractResponse(body);
    const envelopeService = new EnvelopeService(error, data);

    return originalJson.call(this, envelopeService);
  };

  next();
}

/**
 * body can be 3 types
 * 1. Error instance (thrown from external sources)
 * 2. AppError (thrown from this app)
 * 3. data (sent from this app)
 */
function extractResponse(body: unknown) {
  let error: E | null = null;
  let data: unknown = null;

  // 1. AppError — your own error type
  if (AppError.isAppError(body)) {
    error = body;
    data = null;
  }

  // 2. Other (external) errors
  else if (body instanceof Error) {
    error = body;
    data = null;
  }

  // 3. Everything else → treat as successful data
  else {
    data = body;
    error = null;
  }

  return { error, data };
}
