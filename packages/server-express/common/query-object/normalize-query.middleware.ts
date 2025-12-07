import type { Request, Response, NextFunction } from "express";
import type {
  Expansion,
  Filter,
  OrderBy,
  Pagination,
  Selection,
} from "./types";

const RESERVED_KEYS = [
  "page",
  "per_page",
  "sort",
  "direction",
  "fields",
  "include",
];

export function normalizeQueryHandler() {
  return (req: Request, res: Response, next: NextFunction) => {
    const q = req.query;

    req.normQuery = {
      pagination: normalizePagination(q),
      orderBy: normalizeOrderBy(q),
      filters: normalizeFilters(q),
      selection: normalizeSelection(q),
      expansion: normalizeExpansion(q),
    };

    next();
  };
}

function normalizePagination(query: any): Pagination {
  const page = Number(query.page) || 1;
  const per_page = Number(query.per_page) || 20;
  const offset = (page - 1) * per_page;

  return { page, per_page, offset };
}

function normalizeOrderBy(query: any): OrderBy | undefined {
  if (!query.sort) return undefined;

  return {
    sort: String(query.sort),
    direction:
      query.direction === "desc" || query.direction === "asc"
        ? (query.direction as "asc" | "desc")
        : "asc",
  };
}

function normalizeSelection(query: any): Selection {
  if (typeof query.fields !== "string") return {};

  return {
    fields: query.fields.split(",").map((f: string) => f.trim()),
  };
}

function normalizeExpansion(query: any): Expansion {
  if (typeof query.include !== "string") return {};

  return {
    include: query.include.split(",").map((i: string) => i.trim()),
  };
}

export function normalizeFilters(query: any): Filter {
  const filters: Filter = {};

  Object.keys(query).forEach((key) => {
    if (!RESERVED_KEYS.includes(key)) {
      filters[key] = query[key];
    }
  });

  return filters;
}
