import { Hero } from "@/comps/Hero";
import { PageTitle } from "@/comps/PageTitle";

const page = {
  title: "Dashboard",
  breadcrumb: [{ title: "Dashboard" }],
};

export function DashboardPage() {
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
