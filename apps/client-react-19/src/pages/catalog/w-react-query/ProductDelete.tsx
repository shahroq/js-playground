import { Alert, Button } from "@packages/comps";
import type { EntityId } from "@reduxjs/toolkit";
import { useDeleteProduct } from "./hooks";

type Props = {
  id?: EntityId;
  onClose?: () => void;
};

export function ProductDelete({ id, onClose }: Props) {
  const { mutate, isPending, isError, error } = useDeleteProduct(id);

  if (!id) return null;

  const handleDelete = () => {
    mutate(id, { onSuccess: onClose });
  };

  return (
    <div className="space-y-3">
      <p>Are you sure you want to delete this product?</p>

      {isError && (
        <Alert variant="warning">
          {error instanceof Error ? error.message : "Failed to delete product"}
        </Alert>
      )}

      <div className="flex gap-2 justify-end">
        <Button
          className="btn-secondary"
          onClick={onClose}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button
          className="btn-danger"
          onClick={handleDelete}
          loading={isPending}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
