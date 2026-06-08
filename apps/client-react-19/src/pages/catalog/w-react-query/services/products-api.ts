// import { v4 as uuidv4 } from "uuid";
import type { Product } from "@gpublic/types/types";
import { httpClient } from "./api";

export const productKeys = {
  all: ["products"] as const,

  detail: (id: string | number) => ["products", id] as const,
};

const defaultOptions = {
  ...(import.meta.env.DEV ? { delay: 500 } : {}),
};

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  return httpClient.request<Product[]>("/products", {
    ...defaultOptions,
    signal,
  });
}

export async function getProduct(
  id: string | number,
  signal?: AbortSignal,
): Promise<Product> {
  return httpClient.request<Product>(`/products/${id}`, {
    ...defaultOptions,
    signal,
  });
}

export async function deleteProduct(id: string | number): Promise<Product> {
  return httpClient.request<Product>(`/products/${id}`, {
    ...defaultOptions,
    method: "DELETE",
  });
}

export async function createProduct(product: Product): Promise<Product> {
  return httpClient.request<Product>("/products", {
    ...defaultOptions,
    method: "POST",
    data: product,
  });
}

export async function updateProduct(
  id: string | number,
  product: Partial<Product>,
): Promise<Product> {
  return httpClient.request<Product>(`/products/${id}`, {
    ...defaultOptions,
    method: "PATCH",
    data: product,
  });
}
