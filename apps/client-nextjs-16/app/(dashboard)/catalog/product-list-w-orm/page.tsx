import Link from "next/link";
import { Page } from "@jsp/shared/types";
import { Table, TableData } from "@jsp/shared/comps";
import { PageTitle } from "@/comps";
import { getProducts } from "../actions";
import { Product } from "../types";

const page: Page = {
  title: "Product List w/ ORM",
  breadcrumb: [
    { label: "Catalog", path: "/catalog" },
    { label: "Product List w/ ORM" },
  ],
};

export default async function Catalog() {
  const products = await getProducts();

  const data: TableData<Product> = {
    title: "List of products",
    records: products,
    columns: [
      { key: "id", renderTh: () => "ID", renderTd: (row: Product) => row.id },
      {
        key: "name",
        renderTh: () => "Name",
        renderTd: (record: Product) => record.name,
      },
      {
        key: "description",
        renderTh: () => "Description",
        renderTd: (record: Product) => record.description,
      },
      {
        key: "price",
        renderTh: () => "Price",
        renderTd: (record: Product) => `$${record.price}`,
      },
      {
        key: "action",
        renderTh: () => "Actions",
        renderTd: (record: Product) => (
          <div className="flex gap-2">
            <Link
              className="btn btn-sm btn-primary disabled"
              data-href={`product-list-w-orm/${record.id}/update`}
              href="#"
            >
              Edit
            </Link>
            <Link
              className="btn btn-sm btn-danger disabled"
              data-href={`product-list-w-orm/${record.id}/delete`}
              href="#"
            >
              Delete
            </Link>
          </div>
        ),
      },
    ],
  };

  return (
    <section>
      <PageTitle page={page} />
      <Table data={data} className="table-border" />
    </section>
  );
}
