import type { Page, Product } from "@jsp/shared/types";
import { PageTitle } from "@/comps";
import { Alert, Button, Item, Skeleton } from "@jsp/shared/comps";
import { getData } from "./data";
import { Suspense, use } from "react";

const page: Page = {
  title: "Products",
  breadcrumb: [
    { label: "Dashboard" },
    { label: "Catalog" },
    { label: "Product List w/ use hook" },
  ],
};

export default function ProductsPage() {
  return (
    <section>
      <PageTitle page={page} />
      <Suspense fallback={<Skeleton times={5} />}>
        <ProductList />
      </Suspense>
    </section>
  );
}

export function ProductList() {
  const data = use(getData<Product[]>("/products"));

  if (!data?.length)
    return (
      <Alert variant="info" dismissible={false}>
        List is empty.
      </Alert>
    );

  return (
    <>
      <div className="flex gap-1 justify-between">
        <h3>Products</h3>
      </div>

      <hr />

      <ul className="divide-y divide-gray-200 space-y-2">
        {data.map((row) => (
          <Item as="li" key={row.id}>
            <Item.Content>
              <Item.Title>{row.name}</Item.Title>
              <Item.Description>
                {`${row.description} [$${row.price}]`}
              </Item.Description>
            </Item.Content>
            <Item.Content className="flex-none flex-row">
              <Button className="btn-primary btn-sm disabled">I</Button>
            </Item.Content>
          </Item>
        ))}
      </ul>
    </>
  );
}
