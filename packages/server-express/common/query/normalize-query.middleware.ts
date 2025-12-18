import type { Request, Response, NextFunction } from "express";
import { AppQuery } from "@/common/container";
import type { QueryOptions } from "@/common/query/types";

export function normalizeQueryHandler(options: QueryOptions) {
  return (req: Request, res: Response, next: NextFunction) => {
    // V1: get normalized based on dto/options
    // req.normQuery = new AppQuery(req.query, queryOptions, dto).normalized;
    // V2: instantiate an AppQuery class, and attach to request
    // req.appQuery = new AppQuery(req.query, queryOptions);
    // V3: attach it to express req.locals
    res.locals.appQuery = new AppQuery(req.query, options);

    next();
  };
}
