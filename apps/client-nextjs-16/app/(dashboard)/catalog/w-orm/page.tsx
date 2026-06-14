import { Page } from "@jsp/shared/types";
import { PageTitle } from "@/comps";

const page: Page = {
  title: "Catalog w/ ORM",
  breadcrumb: [{ label: "Catalog" }],
};

export default async function Catalog() {
  return (
    <section>
      <PageTitle page={page} />
      <div>Catalog</div>
    </section>
  );
}
