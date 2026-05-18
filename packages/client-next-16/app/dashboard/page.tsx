import { Jumbotron } from "@/comps/Jumbotron";
import { PageTitle } from "@/comps/PageTitle";

const page = {
  title: "Dashboard",
  breadcrumb: [{ title: "Dashboard" }],
};

export default function Dashboard() {
  return (
    <section>
      <PageTitle page={page} />
      <Jumbotron title="Dashboard">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos blanditiis
        numquam accusantium aliquid esse.
      </Jumbotron>
    </section>
  );
}
