import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProductReducer,
  deleteProduct,
  deleteProductReducer,
  getProducts,
} from "./catalog-api";
import {
  Skeleton,
  Alert,
  Table,
  type TableData,
  Button,
  type Variant,
  Modal,
} from "@gpublic/comps";
import type { Product } from "@gpublic/types/types";
import { useState } from "react";
import FormProduct from "./FormProduct";

export function ProductsList() {
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState<{ message?: string; variant?: Variant }>(
    {},
  );
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (id: string | number) => deleteProduct(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      setAlert({
        message: `Product [id=${variables}] was deleted.`,
        variant: "success",
      });
    },
    onError: (e) => {
      setAlert({
        message: e?.message,
        variant: "danger",
      });
    },
  });

  if (isLoading) return <Skeleton times={5} />;
  if (error) setAlert({ message: error?.message, variant: "danger" });

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
        key: "actions",
        renderTh: () => "Actions",
        renderTd: (record: Product) => (
          <>
            <Button
              className="btn-sm btn-danger"
              loading={isPending && variables === record.id}
              data-id={record.id}
              onClick={() => mutate(record.id)}
            >
              Delete w/ RQuery
            </Button>
          </>
        ),
      },
    ],
  };

  return (
    <>
      {alert?.message && (
        <Alert variant={alert?.variant || undefined}>{alert.message}</Alert>
      )}

      <div className="flex flex-row-reverse">
        <Button onClick={() => setShowModal(true)}>Add</Button>

        {/* <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          title={"Create Product"}
          size="2xl"
        >
          <FormProduct
            action={createProductReducer}
            onCloseModal={() => setShowModal(false)}
          />
        </Modal> */}
      </div>

      <Table data={data} />
    </>
  );
}
