import DownloadDataUseCase from '@fuels/domain/use_cases/download_data_use_case';
import GetGasStationsUseCase from '@fuels/domain/use_cases/get_gas_stations_use_case';
import ValidateDatasourceUseCase from '@fuels/domain/use_cases/validate_datasource_use_case';

export default interface GasStationsComponent {
  readonly validateDatasourceUseCase: ValidateDatasourceUseCase;
  readonly downloadDataUseCase: DownloadDataUseCase;
  readonly getGasStationsUseCase: GetGasStationsUseCase;
}
