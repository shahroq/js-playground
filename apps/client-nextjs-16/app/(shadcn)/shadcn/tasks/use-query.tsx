"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { TaskQuery } from "@jsp/shared/types";

export function useTaskQuery() {
  const router = useRouter();
  const sParams = useSearchParams();

  const query: TaskQuery = {
    term: sParams.get("term") ?? undefined,
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
