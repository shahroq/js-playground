import { JSONTree } from "react-json-tree";
import { Skeleton, Alert } from "@gpublic/comps";
import type { EntityId } from "@reduxjs/toolkit";

import { useQuery } from "@tanstack/react-query";
import { getProduct, productKeys } from "./services/products-api";

type Props = {
  id?: EntityId;
};

export function ProductDetails({ id }: Props) {
  // data
  const { data, isPending, isError, error } = useQuery({
    enabled: !!id,
    queryKey: productKeys.detail(id!),
    queryFn: ({ signal }) => getProduct(id!, signal),
  });

  if (!id) return null;

  if (isPending) return <Skeleton times={5} />;
  if (isError && process.env.NODE_ENV === "development")
    return <Alert variant="warning">{JSON.stringify(error)}</Alert>;
  if (isError) {
    return (
      <Alert variant="warning">
        {error instanceof Error ? error.message : "Unknown error"}
      </Alert>
    );
  }
  if (!data)
    return (
      <Alert variant="info" dismissible={false}>
        Empty Dataset
      </Alert>
    );

  return (
    <div>
      Product Details:
      <JSONTree data={data} />
    </div>
  );
}
