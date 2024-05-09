import GasPricesComponent from '@fuels/domain/di/components/gas_prices_component';
import GasPricesModule from '@fuels/domain/di/modules/gas_prices_module';
import GetGasPricesUseCase from '@fuels/domain/use_cases/get_gas_prices_use_case';

export default class GasPricesComponentImpl implements GasPricesComponent {
  private _getGasPricesUseCase?: GetGasPricesUseCase;

  constructor(private readonly module: GasPricesModule) {}

  get getGasPricesUseCase(): GetGasPricesUseCase {
    if (!this._getGasPricesUseCase) {
      this._getGasPricesUseCase = new GetGasPricesUseCase(
        this.module.repository,
      );
    }
    return this._getGasPricesUseCase;
  }
}
