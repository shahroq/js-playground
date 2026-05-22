import { Hero } from "@gpublic/comps";
import { PageTitle } from "@/comps";
import { Page } from "@/gpublic/types/types";

const page: Page = {
  title: "Dashboard",
  breadcrumb: [{ label: "Dashboard" }],
};

export default function Dashboard() {
  return (
    <section>
      <PageTitle page={page} />
      <Hero title="Dashboard">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos blanditiis
        numquam accusantium aliquid esse.
      </Hero>
    </section>
  );
}
