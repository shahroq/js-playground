import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { RootState } from "../store";
import { pause } from "@gpublic/utils";

const baseUrl = "http://localhost:3009";
const maxRetries = 2;
const delay = 500;

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl,
  /*
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authentication", `Bearer ${token}`);
    }
    return headers;
  },
  */
});

const delayedBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await pause(delay);

  return baseQuery(args, api, extraOptions);
};

const retriableBaseQuery = retry(
  import.meta.env.DEV ? delayedBaseQuery : baseQuery,
  { maxRetries },
);

export const api = createApi({
  baseQuery: retriableBaseQuery,
  // reducerPath: "splitApi",
  tagTypes: ["products", "reviews"],
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    getVersion: () => "1.0.0",
  }),
});
