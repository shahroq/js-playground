"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TaskQuery } from "@jsp/shared/types";
import { parseTaskQuery } from "./query";

export function useTaskQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = parseTaskQuery(searchParams);

  function updateQuery(patch: Partial<TaskQuery>) {
    const merged = {
      ...query,
      ...patch,
    };

    const params = new URLSearchParams();

    Object.entries(merged).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, String(value));
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  }

  const href = (patch: Partial<TaskQuery>) => {
    const merged = { ...query, ...patch };
    const params = new URLSearchParams();

    Object.entries(merged).forEach(([k, v]) => {
      if (v !== undefined && v !== "") params.set(k, String(v));
    });

    return `?${params.toString()}`;
  };

  return {
    query,
    updateQuery,
    href,
  };
}
