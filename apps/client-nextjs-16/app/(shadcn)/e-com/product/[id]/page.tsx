import { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Page } from "@jsp/shared/types";
import { Json } from "@jsp/shared/comps";
import { Header } from "@/shadcn/components/Header";
import { getProductById } from "@e-com/_lib/acions";
import { HeaderActions } from "@e-com/_comps";

export const metadata: Metadata = {
  title: "Product Detail Page",
};

const page: Page = {
  title: "My Store",
  breadcrumb: [
    { label: "E-Commerce", path: "/e-com" },
    { label: "Products", path0: "/e-com/products" },
    { label: "Product" },
  ],
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;

  const product = await getProductById(+id);
  if (!product) notFound();

  return (
    <>
      <Header page={page}>
        <HeaderActions />
      </Header>

      <section>
        <Json data={product} />
      </section>
    </>
  );
}
