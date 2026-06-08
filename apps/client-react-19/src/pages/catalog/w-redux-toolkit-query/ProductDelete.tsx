import { Alert, Button } from "@packages/comps";
import type { EntityId } from "@reduxjs/toolkit";
import { useDeleteProductMutation } from "./services/products-api";
import { JSONTree } from "react-json-tree";

type Props = {
  id?: EntityId;
  onClose?: () => void;
};

export function ProductDelete({ id, onClose }: Props) {
  if (!id) return null;

  const [deleteProduct, { isLoading, isError, error }] =
    useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      await deleteProduct(id).unwrap();
      onClose?.(); // close modal after success
    } catch (err) {
      console.error(err);
    }
  };

  if (isError)
    return (
      <Alert variant="danger">
        <JSONTree data={error} />
      </Alert>
    );

  return (
    <div className="space-y-3">
      <p>Are you sure you want to delete this product?</p>

      <div className="flex gap-2 justify-end">
        <Button
          className="btn-secondary"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>

        <Button
          className="btn-danger"
          onClick={handleDelete}
          loading={isLoading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
