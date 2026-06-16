import type { Page } from "@jsp/shared/types";
import { Header } from "@/shadcn/components/Header";
import { Metadata } from "next";
import HeaderActions from "./comps/HeaderActions";
import { catalog } from "@jsp/shared/json";
import { ProductList } from "./comps/ProductList";

export const metadata: Metadata = {
  title: "My Store Home Page",
  description: "Home of e-com",
};

const page: Page = {
  title: "My Store",
  breadcrumb: [{ label: "E-Commerce" }, { label: "My Store" }],
};

export default function Home() {
  return (
    <>
      <Header page={page}>
        <HeaderActions />
      </Header>

      <section>
        My Store: Home
        <ProductList products={catalog.products} title="New Arrivals" />
      </section>
    </>
  );
}
