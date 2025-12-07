export type HttpClientStrategy = "fetch" | "axios";

export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
  responseType?: "json" | "text" | "blob" | "arraybuffer";
}

export interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface IHttpClient {
  getHttpClient<T = any>(): T;
  get<T = any>(url: string, config?: RequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>;
}
