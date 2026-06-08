import axios, { type AxiosInstance } from "axios";
import type {
  IHttpClientService,
  HttpClientConfig,
  RequestConfig,
} from "../http-client-service.interface";

export class AxiosService implements IHttpClientService {
  private httpClient: AxiosInstance;

  constructor(baseConfig: HttpClientConfig) {
    this.httpClient = axios.create(baseConfig);
    // this.__instanceId = crypto.randomUUID();
  }

  getHttpClient<T = AxiosInstance>(): T {
    return this.httpClient as T;
  }

  async get<T = any>(url: string, config?: RequestConfig) {
    const response = await this.httpClient.get<T>(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: RequestConfig) {
    const response = await this.httpClient.post<T>(url, data, config);
    return response.data;
  }
}
