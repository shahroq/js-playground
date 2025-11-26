import axios, { type AxiosInstance } from "axios";
import type {
  IHttpClient,
  HttpClientConfig,
  RequestConfig,
} from "./http-client.interface";

export class AxiosHttpClient implements IHttpClient {
  private httpClient: AxiosInstance;

  constructor(baseConfig: HttpClientConfig = {}) {
    this.httpClient = axios.create(baseConfig);
  }

  getHttpClient<T = AxiosInstance>(): T {
    return this.httpClient as T;
  }

  async get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.httpClient.get<T>(url, config);
    return response.data;
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.httpClient.post<T>(url, data, config);
    return response.data;
  }
}
