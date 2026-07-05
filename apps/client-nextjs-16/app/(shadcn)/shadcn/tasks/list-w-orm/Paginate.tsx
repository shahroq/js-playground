"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/components/ui/pagination";
import { useTaskQuery } from "./use-task-query";

type Props = {
  meta: {
    page: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
};

export function Paginate({ meta }: Props) {
  const { href } = useTaskQuery();

  return (
    <div className="flex-between">
      <p className="text-muted-foreground text-sm">
        Page {meta.page} of {meta.totalPages}
      </p>

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={href({ page: meta.page - 1 })}
              aria-disabled={!meta.hasPrevious}
              tabIndex={meta.hasPrevious ? undefined : -1}
              className={
                !meta.hasPrevious ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href={href({ page: meta.page + 1 })}
              aria-disabled={!meta.hasNext}
              tabIndex={meta.hasNext ? undefined : -1}
              className={!meta.hasNext ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
