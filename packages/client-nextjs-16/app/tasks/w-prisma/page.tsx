import { Hero } from "@gpublic/comps";
import { PageTitle } from "@/comps/PageTitle";
import { Page } from "@/gpublic/types/types";

const page: Page = {
  title: "Tasks",
  breadcrumb: [{ label: "List" }],
};

export default function Tasks() {
  return (
    <section>
      <PageTitle page={page} />
      <div></div>
      <Hero title="Task List" />
    </section>
  );
}
