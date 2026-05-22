import { PageTitle } from "@/comps";
import type { Page } from "@gpublic/types/types";
import { Alert, Button, DummyBox } from "@gpublic/comps";

const page: Page = {
  title: "Misc",
  breadcrumb: [{ label: "Components", path: "/comps" }, { label: "Misc" }],
};

export function MiscPage() {
  return (
    <section>
      <PageTitle page={page} />
      <div className="flex gap-2">
        <Button>Primary</Button>
        <Button className="btn-secondary">Primary</Button>
        <Button disabled>Primary w/ disabled</Button>
        <Button loading>Primary w/ loading</Button>
      </div>
      <DummyBox />
      <Alert dismissible={true}>Simple Alert</Alert>
    </section>
  );
}
