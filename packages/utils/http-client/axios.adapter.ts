import axios from "axios";
import type { HttpClientAdapter, HttpRequestOptions } from "./types";
import { pause } from "../pause";

// Adapter Factory: axios
export function createAxiosAdapter(baseUrl: string): HttpClientAdapter {
  const client = axios.create({ baseURL: baseUrl });

  return {
    async request<T>(
      url: string,
      options: HttpRequestOptions = {},
    ): Promise<T> {
      const { method = "GET", data, headers, signal, delay } = options;

      if (delay) await pause(delay);

      const res = await client.request<T>({
        url,
        method,
        data,
        headers,
        signal, // axios v1 supports AbortSignal
      });

      return res.data;
    },
  };
}
