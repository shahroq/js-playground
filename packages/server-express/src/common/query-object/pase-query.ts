import { isEmpty } from "lodash";
import type { QueryStringDto } from "./dto";
import type {
  Include,
  Fields,
  Page,
  Sort,
  Filter,
  QueryObject,
  QueryObjectPolicy,
} from "./types";

/**
 * Parse Query String to internal QueryObject (JSON:API–like)
 */
export const parseQueryString = (
  querystring: QueryStringDto,
  policy: QueryObjectPolicy
): QueryObject => {
  const include = parseInclude(querystring, policy);
  const fields = parseFields(querystring, policy);
  const page = parsePage(querystring, policy);
  const sort = parseSort(querystring, policy);
  const filter = parseFilter(querystring, policy);

  const queryObject = {
    ...(!isEmpty(include) && { include }),
    ...(!isEmpty(fields) && { fields }),
    ...(!isEmpty(page) && { page }),
    ...(!isEmpty(sort) && { sort }),
    ...(!isEmpty(filter) && { filter }),
  };
  // console.log(queryObject);

  return queryObject;
};

const parseInclude = (
  query: QueryStringDto,
  policy: QueryObjectPolicy
): Include => {
  const includes = toArray(query.include);

  if (!policy.includableCollections) return includes;

  return includes.filter((i) =>
    policy.includableCollections!.includes(i as any)
  );
};

const parseFields = (
  query: QueryStringDto,
  policy: QueryObjectPolicy
): Fields => {
  const fields = toArray(query.fields);

  if (!policy.selectableFields) return fields;

  return fields.filter((i) => policy.selectableFields!.includes(i as any));
};

const parsePage = (query: QueryStringDto, policy: QueryObjectPolicy): Page => {
  if (!policy.allowedKeys.includes("page")) return {};

  const page = (query as any).page ?? {};

  return {
    number: Number(page.number ?? 1),
    size: Number(page.size ?? policy.defaultLimit ?? 10),
  };
};

const parseSort = (query: QueryStringDto, policy: QueryObjectPolicy): Sort => {
  if (!policy.allowedKeys.includes("sort")) return [];

  const raw = toArray(query.sort);
  const result: Sort = [];

  for (const item of raw) {
    const direction = item.startsWith("-") ? "desc" : "asc";
    const field = item.replace(/^-/, "");

    if (policy.sortableFields && !policy.sortableFields.includes(field))
      continue;

    result.push({ field, direction });
  }

  if (result.length === 0 && policy.defaultOrderBy) {
    return parseSort({ sort: policy.defaultOrderBy } as QueryStringDto, policy);
  }

  return result;
};

const parseFilter = (
  query: QueryStringDto,
  policy: QueryObjectPolicy
): Filter => {
  if (!policy.allowedKeys.includes("filter")) return {};

  const filter = (query as any).filter;
  if (!filter || typeof filter !== "object") return {};

  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(filter)) {
    if (policy.filterableFields && !policy.filterableFields.includes(key)) {
      continue;
    }

    result[key] = value;
  }

  return result;
};

const toArray = (value?: string | string[]): string[] => {
  if (!value) return [];
  return Array.isArray(value)
    ? value.flatMap((v) => v.split(","))
    : value.split(",");
};
