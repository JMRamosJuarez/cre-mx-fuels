import CoreComponent from '@core/domain/di/components/core_component';
import CoreModule from '@core/domain/di/modules/core_module';
import GasPricesComponentImpl from '@fuels/data/di/components/gas_prices_component_impl';
import GasStationsComponentImpl from '@fuels/data/di/components/gas_stations_component_impl';
import GasPricesModuleImpl from '@fuels/data/di/modules/gas_prices_module_impl';
import GasStationsModuleImpl from '@fuels/data/di/modules/gas_stations_module_impl';
import GasPricesComponent from '@fuels/domain/di/components/gas_prices_component';
import GasStationsComponent from '@fuels/domain/di/components/gas_stations_component';
import GasPricesModule from '@fuels/domain/di/modules/gas_prices_module';
import GasStationsModule from '@fuels/domain/di/modules/gas_stations_module';

export default class CoreComponentImpl implements CoreComponent {
  private _gasStationsComponent?: GasStationsComponent;
  private _gasPricesComponent?: GasPricesComponent;

  constructor(private readonly coreModule: CoreModule) {}

  get gasStationsComponent(): GasStationsComponent {
    if (!this._gasStationsComponent) {
      const module: GasStationsModule = new GasStationsModuleImpl(
        this.coreModule,
      );
      this._gasStationsComponent = new GasStationsComponentImpl(module);
    }
    return this._gasStationsComponent;
  }

  get gasPricesComponent(): GasPricesComponent {
    if (!this._gasPricesComponent) {
      const module: GasPricesModule = new GasPricesModuleImpl(this.coreModule);
      this._gasPricesComponent = new GasPricesComponentImpl(module);
    }
    return this._gasPricesComponent;
  }
}
