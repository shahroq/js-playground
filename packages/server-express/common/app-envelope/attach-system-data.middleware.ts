import { config, utils } from "@/common/container";
import type { Response, NextFunction } from "express";

let attachment: { info?: string | null; timestamp?: string } = {
  info: config.system_info,
};

/**
 * attach system data to envelope in dev environment
 */
export function attachSystemInfoHandler(
  _: any,
  res: Response,
  next: NextFunction
) {
  const originalJson = res.json;

  res.json = function (body) {
    // Merge the attachment with the actual response body
    attachment = { ...attachment, timestamp: utils.formatISO() };
    const newEnvelope = { system: attachment, ...body };

    // Use the original Express json method (preserves statusCode, headers, etc.)
    return originalJson.call(this, newEnvelope);
  };

  next();
}
