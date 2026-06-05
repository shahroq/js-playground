import type { Product } from "@gpublic/types/types";
import { api } from "./api";

/*
This is NOT a Redux slice!
Some call it a slice, but technically it is: Endpoint Collection, generated inside one API slice.
RTK Query also generates: pending action, fulfilled action, rejected action, cache, selectors, React hooks
*/
export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",

      providesTags: ["products"],
    }),

    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),

    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),

      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  // useUpdateProductMutation,
  // useDeleteProductMutation,
} = productsApi;
