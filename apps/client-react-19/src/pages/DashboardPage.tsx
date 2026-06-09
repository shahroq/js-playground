import { Hero } from "@jsp/shared/comps";
import type { Page } from "@jsp/shared/types";
import { PageTitle } from "@/comps";

const page: Page = {
  title: "Dashboard",
  breadcrumb: [{ label: "Dashboard" }],
};

export default function DashboardPage() {
  return (
    <section>
      <PageTitle page={page} />
      <Hero>
        <Hero.Title>Dashboard</Hero.Title>
        <Hero.Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
          blanditiis numquam accusantium aliquid esse.
        </Hero.Content>
      </Hero>
    </section>
  );
}
