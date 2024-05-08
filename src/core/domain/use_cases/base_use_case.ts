export default interface BaseUseCase<Request, Response> {
  execute(request: Request): Promise<Response>;
}
