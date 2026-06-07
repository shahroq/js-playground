// import { v4 as uuidv4 } from "uuid";
import type { Product } from "@gpublic/types/types";
import { apiFetch } from "./api";

export const productKeys = {
  all: ["products"] as const,

  detail: (id: string | number) => ["products", id] as const,
};

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  return apiFetch<Product[]>("/products", {
    signal,
  });
}

export async function getProduct(
  id: string | number,
  signal?: AbortSignal,
): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`, {
    signal,
  });
}

export async function createProduct(product: Product): Promise<Product> {
  return apiFetch<Product>("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export async function updateProduct(
  id: string | number,
  product: Partial<Product>,
): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id: string | number): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`, {
    method: "DELETE",
  });
}
