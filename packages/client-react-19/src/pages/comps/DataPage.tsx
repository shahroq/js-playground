import { PageTitle } from "@/comps";
import type { Page } from "@gpublic/types/types";
import { Button, Table, type TableData } from "@gpublic/comps";

const page: Page = {
  title: "Data",
  breadcrumb: [{ label: "Components" }, { label: "Data" }],
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

export default function DataPage() {
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
            <Button
              className="btn-sm btn-primary"
              onClick={() => console.log("Edit", record.id)}
            >
              Edit
            </Button>

            <Button
              className="btn-sm btn-danger"
              onClick={() => console.log("Delete", record.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
  };

  return (
    <section>
      <PageTitle page={page} />
      <Table data={data} />
    </section>
  );
}
