import { Query } from "@/common/container";
import type { QueryOptions } from "@/common/query-object/types";
import type { Request, NextFunction } from "express";

export function normalizeQueryHandler(dto?: any, queryOptions?: QueryOptions) {
  return (req: Request, _: any, next: NextFunction) => {
    // normalize based on dto/options
    req.normQuery = new Query(req.query, queryOptions, dto).normalize();

    next();
  };
}
