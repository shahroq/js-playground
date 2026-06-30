import { Metadata } from "next";
import type { Page } from "@jsp/shared/types";
import { Header } from "@/shadcn/components/Header";
import { getProducts } from "./_lib/acions";
import { HeaderActions, ProductList } from "./_comps";

export const metadata: Metadata = {
  title: "My Store Home Page",
  description: "Home of e-com",
};

const page: Page = {
  title: "My Store",
  breadcrumb: [{ label: "E-Commerce (Home)" }],
};

export default async function Page() {
  const latestProducts = await getProducts({ limit: 4 });

  return (
    <>
      <Header page={page}>
        <HeaderActions />
      </Header>

      <section>
        <h2>My Store</h2>
        <ProductList products={latestProducts} title="New Arrivals" />
      </section>
    </>
  );
}
