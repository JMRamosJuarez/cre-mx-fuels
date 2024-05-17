export enum AppErrorType {
  UNKNOWN_ERROR = 'unknown_error',
  SQL_RESULT_NOT_FOUND = 'sql_result_not_found',
  GAS_STATION_NOT_FOUND = 'gas_station_not_found',
  LOCATION_NOT_AVAILABLE = 'location_not_available',
  LOCATION_PERMISSIONS_DENIED = 'location_permissions_denied',
  DATASOURCE_NOT_AVAILABLE = 'datasource_not_available',
}

export default class AppError {
  readonly name: string;

  constructor(readonly type: AppErrorType, readonly message?: string) {
    this.name = 'AppError';
  }
}
