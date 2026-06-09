import type { Page } from "@jsp/shared/types";
import { PageTitle } from "@/comps";

const page: Page = {
  title: "Sandbox",
  breadcrumb: [{ label: "Sandbox" }],
};

export default function SandboxPage() {
  return (
    <section>
      <PageTitle page={page} />
      ...
    </section>
  );
}
