import { JSONTree } from "react-json-tree";
import { Skeleton, Alert } from "@packages/comps";
import type { EntityId } from "@reduxjs/toolkit";
import { useGetProductQuery } from "./services/products-api";

type Props = {
  id?: EntityId;
};

export function ProductDetails({ id }: Props) {
  if (!id) return null;

  // data
  const { data, isLoading, error, isError } = useGetProductQuery(id);

  if (isLoading) return <Skeleton times={5} />;
  if (isError) return <Alert variant="warning">{JSON.stringify(error)}</Alert>;
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
