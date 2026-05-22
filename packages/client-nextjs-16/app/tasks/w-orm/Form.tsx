"use client";
import { InferSelectModel } from "drizzle-orm";
import { tasksTable } from "@/data/schema";
import { Button, FormControl } from "@gpublic/comps";

type Task = InferSelectModel<typeof tasksTable>;
type Props = {
  task: Task;
  action: () => void;
};

export default function Form({ task = {}, action }: Props) {
  const taskAction1 = (formData: FormData) => {
    // startTransition(() => {
    task.id ? action(task.id, formData) : action(formData);
    // });
  };

  const taskAction2 = action.bind(null, task.id);

  return (
    <form className="form" action={taskAction1}>
      <FormControl
        type="input"
        subtype="text"
        name="title"
        id="title"
        label="Title"
        defaultValue={task.title || ""}
      />
      <FormControl
        type="input"
        subtype="textarea"
        name="desc"
        id="desc"
        label="Description"
        defaultValue={task.desc || ""}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
