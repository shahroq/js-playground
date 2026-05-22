import { deleteTask } from "../../actions";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Update({ params }: Props) {
  const { id } = await params;

  await deleteTask(parseInt(id));
  redirect(`/tasks/w-orm`);

  return <section>Deleting the task...</section>;
}
