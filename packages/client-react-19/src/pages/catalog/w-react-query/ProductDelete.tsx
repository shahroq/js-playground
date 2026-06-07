import { Alert, Button } from "@gpublic/comps";
import type { EntityId } from "@reduxjs/toolkit";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, productKeys } from "./services/products-api";

type Props = {
  id?: EntityId;
  onClose?: () => void;
};

export function ProductDelete({ id, onClose }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (id: EntityId) => deleteProduct(id),

    onSuccess: (_, deletedId) => {
      // 1. update list cache immediately (optimistic feel)
      queryClient.setQueryData(productKeys.all, (old: any[] = []) =>
        old.filter((p) => p.id !== deletedId),
      );

      // 2. optionally remove detail cache
      queryClient.removeQueries({
        queryKey: productKeys.detail(deletedId),
      });

      // 3. close modal
      onClose?.();
    },
  });

  if (!id) return null;

  const handleDelete = () => {
    mutate(id);
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
