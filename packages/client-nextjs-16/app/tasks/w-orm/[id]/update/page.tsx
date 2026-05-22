import { notFound } from "next/navigation";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { tasksTable } from "@/data/schema";
import { PageTitle } from "@/comps";
import { Page } from "@/gpublic/types/types";
import Form from "../../Form";
import { updateTask } from "../../actions";

const page: Page = {
  title: "Update",
  breadcrumb: [
    { label: "Tasks" },
    { label: "List", path: "/tasks/w-orm" },
    { label: "Update" },
  ],
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Update({ params }: Props) {
  const { id } = await params;

  const task = await db
    .select()
    .from(tasksTable)
    .where(sql`${tasksTable.id} = ${id}`)
    .limit(1)
    .then((res) => res[0]);

  if (!task) return notFound();

  return (
    <section>
      <PageTitle page={page} />
      <Form task={task} action={updateTask} />
    </section>
  );
}
