import { PageTitle } from "@/comps";
import { Page } from "@/gpublic/types/types";
import { createTaskReducer } from "../actions";
import FormTask from "../FormTask";

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
      <FormTask action={createTaskReducer} />
    </section>
  );
}
