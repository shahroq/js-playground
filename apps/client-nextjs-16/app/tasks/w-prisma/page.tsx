import { Table, Button, type TableData } from "@packages/comps";
import { PageTitle } from "@/comps/PageTitle";
import { Page } from "@packages/types/types";
import Link from "next/link";

const page: Page = {
  title: "Tasks",
  breadcrumb: [{ label: "Tasks" }, { label: "List" }],
};

type Task = {
  id: number;
  title: string;
  description: string;
};

const tasks: Task[] = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Milk, eggs, bread",
  },
  {
    id: 2,
    title: "Finish project",
    description: "Complete reusable table component",
  },
];

export default function Tasks() {
  const data: TableData<Task> = {
    title: "List of tasks",
    records: tasks,
    columns: [
      { key: "id", renderTh: () => "ID", renderTd: (row: Task) => row.id },
      {
        key: "title",
        renderTh: () => "Title",
        renderTd: (record: Task) => record.title,
      },
      {
        key: "desc",
        renderTh: () => "Desc",
        renderTd: (record: Task) => record.description,
      },
      {
        key: "action",
        renderTh: () => "Actions",
        renderTd: (record: Task) => (
          <div className="flex gap-2">
            <Button className="btn-sm btn-primary">Edit</Button>

            <Button className="btn-sm btn-danger">Delete</Button>
          </div>
        ),
      },
    ],
  };

  return (
    <section>
      <PageTitle page={page} />
      <div className="flex flex-row-reverse">
        <Link href="w-prisma/create" className="btn btn-primary">
          Add
        </Link>
      </div>
      <Table data={data} className="table-border" />
    </section>
  );
}
