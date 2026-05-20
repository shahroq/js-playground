import { PageTitle } from "@/comps/PageTitle";
import type { Page } from "@gpublic/types/types";
import { DummyBox } from "@gpublic/comps/DummyBox";
import { Alert } from "@gpublic/comps/Alert";

const page: Page = {
  title: "Misc",
  breadcrumb: [{ label: "Components", path: "/comps" }, { label: "Misc" }],
};

export function MiscPage() {
  return (
    <section>
      <PageTitle page={page} />
      <DummyBox />
      <Alert dismissible={true}>Simple Alert</Alert>
    </section>
  );
}
