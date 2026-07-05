"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { TaskQuery, TaskStatus } from "@jsp/shared/types";

// synchronizes your task filters with the URL query string.
export function useTaskQuery() {
  const router = useRouter();
  const sParams = useSearchParams();

  const query: TaskQuery = {
    term: sParams.get("term") ?? undefined,
    status: (sParams.get("status") as TaskStatus) ?? undefined,
    page: sParams.get("page") ? Number(sParams.get("page")) : undefined,
    limit: sParams.get("limit") ? Number(sParams.get("limit")) : undefined,
  };

  const updateQuery = (patch: Partial<TaskQuery>) => {
    const merged = { ...query, ...patch };
    const params = new URLSearchParams();

    Object.entries(merged).forEach(([k, v]) => {
      if (v !== undefined && v !== "") params.set(k, String(v));
    });

    router.replace(`?${params.toString()}`);
  };

  return { query, updateQuery };
}
