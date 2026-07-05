import { TaskQuery, TaskSort, TaskStatus } from "@jsp/shared/types";

type SearchParams = URLSearchParams;

export function parseTaskQuery(searchParams: SearchParams): TaskQuery {
  const get = (key: string): string | undefined => {
    if (searchParams instanceof URLSearchParams) {
      return searchParams.get(key) ?? undefined;
    }

    const value = searchParams[key];

    if (Array.isArray(value)) return value[0];

    return value;
  };

  return {
    term: get("term"),
    status: get("status") as TaskStatus | undefined,
    page: toNumber(get("page")),
    limit: toNumber(get("limit")),
    sort: get("sort") as TaskSort | undefined,
  };
}

function toNumber(value?: string) {
  if (!value) return undefined;

  const n = Number(value);

  return Number.isNaN(n) ? undefined : n;
}
