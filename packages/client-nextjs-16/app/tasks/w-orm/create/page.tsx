import { PageTitle } from "@/comps";
import { Page } from "@/gpublic/types/types";
import { createTask } from "../actions";
import Form from "../Form";

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
      <Form action={createTask} />
    </section>
  );
}
