import { config, utils } from "@/common/container";
import type { Request, Response, NextFunction } from "express";

let SYSTEM_DATA: { info?: string | null; timestamp?: string } = {
  info: config.system_info,
};

/**
 * attach system data to envelope in dev environment
 */
export function attachSystemDataHandler(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const originalJson = res.json;

  res.json = function (body) {
    // Merge the fixed system info with the actual response body
    SYSTEM_DATA = { ...SYSTEM_DATA, timestamp: utils.formatISO() };
    const finalBody = { system: SYSTEM_DATA, ...body };

    // Use the original Express json method (preserves statusCode, headers, etc.)
    return originalJson.call(this, finalBody);
  };

  next();
}
