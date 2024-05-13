import GasStationsComponent from '@fuels/domain/di/components/gas_stations_component';
import GasPricesModule from '@fuels/domain/di/modules/gas_prices_module';
import GasStationsModule from '@fuels/domain/di/modules/gas_stations_module';
import DownloadDataUseCase from '@fuels/domain/use_cases/download_data_use_case';
import GetGasStationsUseCase from '@fuels/domain/use_cases/get_gas_stations_use_case';
import ValidateDatasourceUseCase from '@fuels/domain/use_cases/validate_datasource_use_case';

export default class GasStationsComponentImpl implements GasStationsComponent {
  private _validateDatasourceUseCase?: ValidateDatasourceUseCase;
  private _downloadDataUseCase?: DownloadDataUseCase;
  private _getGasStationsUseCase?: GetGasStationsUseCase;

  constructor(
    private readonly stationsModule: GasStationsModule,
    private readonly pricesModule: GasPricesModule,
  ) {}

  get validateDatasourceUseCase(): ValidateDatasourceUseCase {
    if (!this._validateDatasourceUseCase) {
      this._validateDatasourceUseCase = new ValidateDatasourceUseCase(
        this.stationsModule.repository,
        this.pricesModule.repository,
      );
    }
    return this._validateDatasourceUseCase;
  }

  get downloadDataUseCase(): DownloadDataUseCase {
    if (!this._downloadDataUseCase) {
      this._downloadDataUseCase = new DownloadDataUseCase(
        this.stationsModule.repository,
        this.pricesModule.repository,
      );
    }
    return this._downloadDataUseCase;
  }

  get getGasStationsUseCase(): GetGasStationsUseCase {
    if (!this._getGasStationsUseCase) {
      this._getGasStationsUseCase = new GetGasStationsUseCase(
        this.stationsModule.repository,
        this.pricesModule.repository,
      );
    }
    return this._getGasStationsUseCase;
  }
}
