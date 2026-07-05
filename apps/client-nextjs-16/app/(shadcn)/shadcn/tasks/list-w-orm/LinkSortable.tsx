"use client";

import Link from "next/link";
import { TaskSortField } from "@jsp/shared/types";
import { useTaskQuery } from "./use-task-query";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ field: TaskSortField }>;

export function LinkSortable({ field, children }: Props) {
  const { query, href } = useTaskQuery();

  const current = query.sort;
  const nextSort = current === field ? `-${field}` : field;
  const icon = current === field ? " ↑" : current === `-${field}` ? " ↓" : "";

  return (
    <Link
      href={href({ sort: nextSort, page: 1 })}
      className="inline-flex items-center gap-1 border-b border-dotted border-transparent text-muted-foreground hover:border-current hover:text-foreground"
    >
      {children}
      {icon}
    </Link>
  );
}
