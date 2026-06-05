import { PageTitle } from "@/comps";
import type { Page } from "@gpublic/types/types";
import { Alert, Button, Skeleton } from "@gpublic/comps";

import { Provider } from "react-redux";
import { store } from "./store";
import { useGetProductsQuery } from "./services/products-api";

const page: Page = {
  title: "Products",
  breadcrumb: [
    { label: "Dashboard" },
    { label: "Catalog w/ Redux Toolkit Query" },
    { label: "Products" },
  ],
};

export default function ProductsPage() {
  return (
    <Provider store={store}>
      <section>
        <PageTitle page={page} />
        <List />
      </section>
    </Provider>
  );
}

function List() {
  // console.log(store.getState());
  const { data, isLoading, error, isError } = useGetProductsQuery();

  if (isLoading) return <Skeleton times={5} />;
  if (isError) return <Alert variant="warning">{JSON.stringify(error)}</Alert>;

  return (
    <div>
      <div className="flex gap-1">
        <Button className="btn-sm btn-primary">+</Button>
        <h3>Products</h3>
      </div>
      <hr />
      <ul className="stacked-list">
        {data?.map((row) => (
          <li className="stacked-list-item" key={row.id}>
            <div>
              <h3>{row.name}</h3>
              <p>{row.description}</p>
            </div>
            <div data-className="flex gap-1">
              <Button className="btn-sm btn-outline">E</Button>
              <Button className="btn-sm btn-danger">X</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
