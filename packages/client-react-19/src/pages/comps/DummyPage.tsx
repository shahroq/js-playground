import { PageTitle } from "@/comps/PageTitle";
import type { Page } from "@gpublic/types/types";
import { DummyBox } from "@gpublic/comps/DummyBox";

const page: Page = {
  title: "Dummy",
  breadcrumb: [{ label: "Components", path: "/comps" }, { label: "Dummy" }],
};

export function DummyPage() {
  return (
    <section>
      <PageTitle page={page} />
      <DummyBox />
    </section>
  );
}
