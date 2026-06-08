import type { Request, Response, NextFunction } from "express";

export function coerceId(req: Request, _res: Response, next: NextFunction) {
  // Helper to convert a value to integer if possible
  const parseIfId = (obj: any) => {
    if (obj && typeof obj === "object") {
      for (const key of Object.keys(obj)) {
        if (key === "id" && typeof obj[key] === "string") {
          const parsed = parseInt(obj[key], 10);
          if (!isNaN(parsed)) {
            obj[key] = parsed;
          }
        }
      }
    }
  };

  parseIfId(req.params);
  parseIfId(req.query);
  parseIfId(req.body);

  next();
}
