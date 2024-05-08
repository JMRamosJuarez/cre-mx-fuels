import SQLRequest from '@core/domain/entities/sql_request';

export default interface AppDbClient<DB, DBParams, Result> {
  openDatabase(params: DBParams): Promise<DB>;
  executeSql(request: SQLRequest): Promise<Result>;
}
