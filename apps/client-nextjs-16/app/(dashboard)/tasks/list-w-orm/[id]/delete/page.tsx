import { redirect } from "next/navigation";
import { deleteTask } from "../../actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Delete({ params }: Props) {
  const { id } = await params;

  await deleteTask(parseInt(id));
  redirect(`/tasks/list-w-orm`);

  return <section>Deleting the task...</section>;
}
