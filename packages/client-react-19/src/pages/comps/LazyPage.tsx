import type { Page } from "@gpublic/types/types";
import { PageTitle } from "@/comps";

const page: Page = {
  title: "Lazy",
  breadcrumb: [{ label: "Components", path: "/comps" }, { label: "Lazy" }],
};

export default function MiscPage() {
  return (
    <section>
      <PageTitle page={page} />
      <h3>This a lazy page!</h3>
    </section>
  );
}
