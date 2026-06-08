import { useMutation, useQuery } from "@tanstack/react-query";
import {
  productKeys,
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
} from "./services/products-api";
import type { EntityId } from "@reduxjs/toolkit";
import { queryClient } from "./services/api";
import type { Product } from "@gpublic/types/types";

export const useProducts = () =>
  useQuery({
    queryKey: productKeys.all,
    queryFn: ({ signal }) => getProducts(signal),
  });

export const useProduct = (id?: EntityId) =>
  useQuery({
    enabled: !!id,
    queryKey: productKeys.detail(id!),
    queryFn: ({ signal }) => getProduct(id!, signal),
  });

export const useDeleteProduct = (id?: EntityId) => {
  return useMutation({
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
    },
  });
};

export const useCreateProduct = () =>
  useMutation({
    mutationFn: (data: Product) => createProduct(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });

export const useUpdateProduct = (id?: EntityId) =>
  useMutation({
    mutationFn: ({ id, data }: { id: EntityId; data: Product }) =>
      updateProduct(id, data),

    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.detail(vars.id),
      });
    },
  });
