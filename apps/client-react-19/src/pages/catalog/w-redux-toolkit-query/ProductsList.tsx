import { useState } from "react";

import type { EntityId } from "@packages/types/types";
import { Alert, Button, Item, ModalV2, Skeleton } from "@packages/comps";

// import { store } from "./store";
import { useGetProductsQuery } from "./services/products-api";
import { ProductDetails } from "./ProductDetails";
import { ProductDelete } from "./ProductDelete";
import { ProductForm } from "./ProductForm";

type ModalState =
  | { type: "details"; id: EntityId }
  | { type: "delete"; id: EntityId }
  | { type: "form"; id?: EntityId }
  | null;

export function ProductList() {
  // console.log(store.getState());

  // data
  const { data, isLoading, error, isError } = useGetProductsQuery();

  // modal
  const [modal, setModal] = useState<ModalState>(null);
  const closeModal = () => setModal(null);
  const openModal = (state: ModalState) => setModal(state);

  if (isLoading) return <Skeleton times={5} />;
  if (isError) return <Alert variant="warning">{JSON.stringify(error)}</Alert>;
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
        <Button
          className="btn-sm btn-primary"
          onClick={() => openModal({ type: "form" })}
        >
          +
        </Button>
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
              <Button
                className="btn-primary btn-sm"
                onClick={() => openModal({ type: "details", id: row.id })}
              >
                I
              </Button>

              <Button
                className="btn-danger btn-sm"
                onClick={() => openModal({ type: "delete", id: row.id })}
              >
                X
              </Button>

              <Button
                className="btn-outline btn-sm"
                onClick={() => openModal({ type: "form", id: row.id })}
              >
                E
              </Button>
            </Item.Content>
          </Item>
        ))}
      </ul>

      {/* Product Modal */}
      <ModalV2
        title={modal?.type?.toUpperCase() || ""}
        size={modal?.type === "delete" ? "md" : "2xl"}
        openName={modal ? "product-modal" : ""}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
      >
        <ModalV2.Window name="product-modal">
          <ModalV2.Content>
            {modal?.type === "details" && <ProductDetails id={modal.id} />}

            {modal?.type === "delete" && (
              <ProductDelete id={modal.id} onClose={closeModal} />
            )}

            {modal?.type === "form" && (
              <ProductForm id={modal.id} onClose={closeModal} />
            )}
          </ModalV2.Content>
        </ModalV2.Window>
      </ModalV2>
    </>
  );
}
