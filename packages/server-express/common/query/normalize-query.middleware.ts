import type { Request, Response, NextFunction } from "express";
import { AppQuery } from "@/common/container";
import type { QueryPolicy } from "@/common/query/types";

export function normalizeQueryHandler(policy: QueryPolicy) {
  return (req: Request, res: Response, next: NextFunction) => {
    // V1: get normalized based on dto/ploicy
    // req.normQuery = new AppQuery(req.query, queryPolicy, dto).normalized;
    // V2: instantiate an AppQuery class, and attach to request
    // req.appQuery = new AppQuery(req.query, queryPolicy);
    // V3: attach it to express req.locals
    res.locals.appQuery = new AppQuery(req.query, policy);

    next();
  };
}
