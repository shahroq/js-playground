"use client";
import { InferSelectModel } from "drizzle-orm";
import { tasksTable } from "@/data/schema";
import { Button, FormControl } from "@gpublic/comps";

type Task = InferSelectModel<typeof tasksTable>;
type Props = {
  task: Task;
  action: () => void;
};

export default function Form({ task, action }: Props) {
  /*
  // with state
  const [formData, setFormData] = useState({
    title: task.title,
    desc: task.desc,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  */

  const handleAction1 = (formData: FormData) => {
    // startTransition(() => {
    action(task.id, formData);
    // });
  };

  const handleAction2 = action.bind(null, task.id);

  return (
    <form className="form" action={handleAction1}>
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
