import { Hero } from "@gpublic/comps";
import { PageTitle } from "@/comps/PageTitle";
import { Page } from "@/gpublic/types/types";

const page: Page = {
  title: "Tasks",
  breadcrumb: [{ label: "List", path: "/tasks/w-prisma" }, { label: "Create" }],
};

export default function New() {
  return (
    <section>
      <PageTitle page={page} />
      <Hero title="New Task" />
    </section>
  );
}
