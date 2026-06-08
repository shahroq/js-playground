import { PageTitle } from "@/comps";
import { Page } from "@packages/types/types";

const page: Page = {
  title: "Test",
  breadcrumb: [{ label: "Test" }],
};

export default function Test() {
  return (
    <section>
      <PageTitle page={page} />
    </section>
  );
}
