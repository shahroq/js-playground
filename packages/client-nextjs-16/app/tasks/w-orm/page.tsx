import Link from "next/link";
import { Table, type TableData } from "@gpublic/comps";
import { PageTitle } from "@/comps/PageTitle";
import { Page } from "@/gpublic/types/types";
import { Task } from "./types";
import { getTasks } from "./actions";

const page: Page = {
  title: "Tasks",
  breadcrumb: [{ label: "Tasks" }, { label: "List" }],
};

export default async function Tasks() {
  const tasks = await getTasks();

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
        renderTd: (record: Task) => record.desc,
      },
      {
        key: "action",
        renderTh: () => "Actions",
        renderTd: (record: Task) => (
          <div className="flex gap-2">
            <Link
              className="btn btn-sm btn-primary"
              href={`w-orm/${record.id}/update`}
            >
              Edit
            </Link>
            <Link
              className="btn btn-sm btn-danger"
              href={`w-orm/${record.id}/delete`}
            >
              Delete
            </Link>
          </div>
        ),
      },
    ],
  };

  return (
    <section>
      <PageTitle page={page} />
      <div className="flex flex-row-reverse">
        <Link href={`w-orm/create`} className="btn btn-primary">
          Add
        </Link>
      </div>
      <Table data={data} className="table-border" />
    </section>
  );
}
