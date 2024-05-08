export default interface HttpClient<Config = Record<string, any>> {
  request<Response>(config: Config): Promise<Response>;

  get<Response>(url: string, config?: Config): Promise<Response>;

  post<Request, Response>(
    url: string,
    data?: Request,
    config?: Config,
  ): Promise<Response>;

  put<Request, Response>(
    url: string,
    data?: Request,
    config?: Config,
  ): Promise<Response>;

  patch<Request, Response>(
    url: string,
    data?: Request,
    config?: Config,
  ): Promise<Response>;

  delete<Response>(url: string, config?: Config): Promise<Response>;
}
