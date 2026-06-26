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
import { getTasks } from "@/lib/actions/tasks.action";
import { Filters } from "./Filter";
import { Actions } from "./Actions";
import { ActionCreate } from "./ActionCreate";

const page: Page = {
  title: "Tasks",
  breadcrumb: [{ label: "Shadcn" }, { label: "Posts" }],
};

type Props = {
  searchParams: Promise<TaskQuery>;
};

type PropsTaskList = {
  query?: TaskQuery;
};

export default async function Page({ searchParams }: Props) {
  const sParams = await searchParams;

  const query: TaskQuery = {
    term: sParams.term || undefined,
    page: sParams.page ? Number(sParams.page) : undefined,
    limit: sParams.limit ? Number(sParams.limit) : undefined,
  };

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
  const data = await getTasks(query);

  if (!data.length) {
    return (
      <p className="text-muted-foreground py-8 text-center">No tasks found.</p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.id}</TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell className="text-right">
              <Actions task={row} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
