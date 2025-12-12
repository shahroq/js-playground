import type { Request, NextFunction } from "express";
import { AppQuery } from "@/common/container";
import type { QueryOptions } from "@/common/app-query/types";

export function normalizeQueryHandler(queryOptions: QueryOptions) {
  return (req: Request, _: any, next: NextFunction) => {
    // V1: get normalized based on dto/options
    // req.normQuery = new AppQuery(req.query, queryOptions, dto).normalized;
    // V2: instantiate an AppQuery class, and attach to request
    req.appQuery = new AppQuery(req.query, queryOptions);

    next();
  };
}
