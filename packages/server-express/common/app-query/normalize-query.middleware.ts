import { AppQuery } from "@/common/container";
import type { QueryOptions } from "@/common/app-query/types";
import type { Request, NextFunction } from "express";

export function normalizeQueryHandler(
  queryOptions: QueryOptions,
  dto: any = {}
) {
  return (req: Request, _: any, next: NextFunction) => {
    // get normalized based on dto/options
    req.normQuery = new AppQuery(req.query, queryOptions, dto).normalized;

    next();
  };
}
