import { Suspense } from "react";
import type { Page, TaskQuery } from "@jsp/shared/types";
import { Header } from "@/shadcn/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { SkeletonTable } from "@/shadcn/components/SkeletonTable";
import { findTasks } from "@/lib/actions/tasks.action";
import { Filters } from "./Filter";
import { Actions } from "./Actions";
import { ActionCreate } from "./ActionCreate";
import { StatusBadge } from "./StatusBadge";
import { parseTaskQuery } from "./query";
import { LinkSortable } from "./LinkSortable";
import { Paginate } from "./Paginate";

const page: Page = {
  title: "Tasks",
  breadcrumb: [
    { label: "Shadcn" },
    { label: "Tasks" },
    { label: "List w/ ORM" },
  ],
};

type Props = { searchParams: Promise<URLSearchParams> };
type PropsTaskList = { query: TaskQuery };

export default async function Page({ searchParams }: Props) {
  const query = parseTaskQuery(await searchParams);

  return (
    <>
      <Header page={page} />

      <section>
        <div className="flex-between">
          <h2>Tasks</h2>
          <div className="flex gap-2">
            <Filters />
            <ActionCreate />
          </div>
        </div>

        <Suspense fallback={<SkeletonTable />}>
          <TaskList query={query} />
        </Suspense>
      </section>
    </>
  );
}

async function TaskList({ query }: PropsTaskList) {
  const result = await findTasks(query);

  if (!result.items.length) {
    return (
      <p className="text-muted-foreground py-8 text-center">No tasks found.</p>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">
              <LinkSortable field="id">ID</LinkSortable>
            </TableHead>
            <TableHead>
              <LinkSortable field="title">Title</LinkSortable>
            </TableHead>
            <TableHead>
              <LinkSortable field="status">Status</LinkSortable>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell className="text-right">
                <Actions task={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Paginate meta={result.meta} />
    </>
  );
}
