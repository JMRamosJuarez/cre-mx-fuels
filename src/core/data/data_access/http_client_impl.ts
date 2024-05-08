import HttpClient from '@core/domain/data_access/http_client';
import { AxiosInstance } from 'axios';

export default class HttpClientImpl implements HttpClient {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async request<Response>(config: Record<string, any>): Promise<Response> {
    const response = await this.axiosInstance.request<Response>(config);
    return response.data;
  }

  async get<Response>(
    url: string,
    config?: Record<string, any>,
  ): Promise<Response> {
    const response = await this.axiosInstance.get<Response>(url, config);
    return response.data;
  }

  async post<Request, Response>(
    url: string,
    data?: Request | undefined,
    config?: Record<string, any> | undefined,
  ): Promise<Response> {
    const response = await this.axiosInstance.post<Response>(url, data, config);
    return response.data;
  }

  async put<Request, Response>(
    url: string,
    data?: Request | undefined,
    config?: Record<string, any> | undefined,
  ): Promise<Response> {
    const response = await this.axiosInstance.put<Response>(url, data, config);
    return response.data;
  }

  async patch<Request, Response>(
    url: string,
    data?: Request | undefined,
    config?: Record<string, any> | undefined,
  ): Promise<Response> {
    const response = await this.axiosInstance.patch<Response>(
      url,
      data,
      config,
    );
    return response.data;
  }

  async delete<Response>(
    url: string,
    config?: Record<string, any> | undefined,
  ): Promise<Response> {
    const response = await this.axiosInstance.delete<Response>(url, config);
    return response.data;
  }
}
