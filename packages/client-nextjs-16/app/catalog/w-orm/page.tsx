import { PageTitle } from "@/comps";
import { Page } from "@/gpublic/types/types";

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
