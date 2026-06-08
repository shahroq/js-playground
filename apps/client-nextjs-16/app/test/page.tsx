import { PageTitle } from "@/comps";
import { Page } from "@/gpublic/types/types";

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
