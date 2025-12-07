import { config } from "@/common/container";
import type { Request, Response, NextFunction } from "express";

const SYSTEM_INFO =
  config.env === "development"
    ? {
        system: {
          info: config.system_info,
        },
      }
    : {};

/**
 * add system info in dev environment
 */
export function appendSystemInfoHandler(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  // Only override res.json once
  if (res.json === res.__originalJson) return next();

  const originalJson = res.json;

  res.json = function (body) {
    // Merge the fixed system info with the actual response body
    const finalBody = { ...SYSTEM_INFO, ...body };

    // Use the original Express json method (preserves statusCode, headers, etc.)
    return originalJson.call(this, finalBody);
  };

  next();
}
