import GasStationsComponent from '@fuels/domain/di/components/gas_stations_component';
import GasStationsModule from '@fuels/domain/di/modules/gas_stations_module';
import GetGasStationsUseCase from '@fuels/domain/use_cases/get_gas_stations_use_case';

export default class GasStationsComponentImpl implements GasStationsComponent {
  private _getGasStationsUseCase?: GetGasStationsUseCase;

  constructor(private readonly module: GasStationsModule) {}

  get getGasStationsUseCase(): GetGasStationsUseCase {
    if (!this._getGasStationsUseCase) {
      this._getGasStationsUseCase = new GetGasStationsUseCase(
        this.module.repository,
      );
    }
    return this._getGasStationsUseCase;
  }
}
