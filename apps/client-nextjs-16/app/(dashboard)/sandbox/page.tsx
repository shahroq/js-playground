import { Page } from "@jsp/shared/types";
import { PageTitle } from "@/comps";

const page: Page = {
  title: "Sandbox",
  breadcrumb: [{ label: "Sandbox" }],
};

export default function Sandbox() {
  return (
    <section>
      <PageTitle page={page} />
      ...
    </section>
  );
}
