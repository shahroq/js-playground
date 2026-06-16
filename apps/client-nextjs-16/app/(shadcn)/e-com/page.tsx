import { Metadata } from "next";
import type { Page } from "@jsp/shared/types";
import { Header } from "@/shadcn/components/Header";
import { getProducts } from "./lib/acions";
import { HeaderActions, ProductList } from "./comps";

export const metadata: Metadata = {
  title: "My Store Home Page",
  description: "Home of e-com",
};

const page: Page = {
  title: "My Store",
  breadcrumb: [{ label: "E-Commerce" }, { label: "My Store" }],
};

export default async function Home() {
  const latestProducts = await getProducts({ limit: 4 });

  return (
    <>
      <Header page={page}>
        <HeaderActions />
      </Header>

      <section>
        My Store: Home
        <ProductList products={latestProducts} title="New Arrivals" />
      </section>
    </>
  );
}
