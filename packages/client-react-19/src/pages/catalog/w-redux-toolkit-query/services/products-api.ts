import type { EntityId, Product } from "@gpublic/types/types";
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
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Products", id }) as const),
        { type: "Products" as const, id: "LIST" },
      ],
    }),

    getProduct: builder.query<Product, EntityId>({
      query: (id) => `/products/${id}`,
      providesTags: (_product, _err, id) => [{ type: "Products", id }],
    }),

    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    updateProduct: builder.mutation<
      Product,
      { id: EntityId; body: Partial<Product> }
    >({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT", // or PATCH depending on backend
        body,
      }),
      invalidatesTags: (product) => [{ type: "Products", id: product?.id }],
    }),

    deleteProduct: builder.mutation<{ success: boolean }, EntityId>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (product) => [{ type: "Products", id: product?.id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
