import { Button, FormControl } from "@gpublic/comps";
import { PageTitle } from "@/comps/PageTitle";
import { Page } from "@/gpublic/types/types";
import { createTask } from "../actions";

const page: Page = {
  title: "Create",
  breadcrumb: [
    { label: "Tasks" },
    { label: "List", path: "/tasks/w-orm" },
    { label: "Create" },
  ],
};

export default function Create() {
  return (
    <section>
      <PageTitle page={page} />
      <form className="form" action={createTask}>
        <FormControl
          type="input"
          subtype="text"
          name="title"
          id="title"
          label="Title"
        />
        <FormControl
          type="input"
          subtype="textarea"
          name="desc"
          id="desc"
          label="Description"
        />
        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
}
