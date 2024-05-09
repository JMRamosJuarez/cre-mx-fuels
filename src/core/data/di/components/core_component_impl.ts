import CoreComponent from '@core/domain/di/components/core_component';
import CoreModule from '@core/domain/di/modules/core_module';
import GasStationsComponentImpl from '@fuels/data/di/components/gas_stations_component_impl';
import GasPricesModuleImpl from '@fuels/data/di/modules/gas_prices_module_impl';
import GasStationsModuleImpl from '@fuels/data/di/modules/gas_stations_module_impl';
import GasStationsComponent from '@fuels/domain/di/components/gas_stations_component';
import GasPricesModule from '@fuels/domain/di/modules/gas_prices_module';
import GasStationsModule from '@fuels/domain/di/modules/gas_stations_module';

export default class CoreComponentImpl implements CoreComponent {
  private _gasStationsComponent?: GasStationsComponent;

  constructor(private readonly coreModule: CoreModule) {}

  get gasStationsComponent(): GasStationsComponent {
    if (!this._gasStationsComponent) {
      const stationsModule: GasStationsModule = new GasStationsModuleImpl(
        this.coreModule,
      );
      const pricesModule: GasPricesModule = new GasPricesModuleImpl(
        this.coreModule,
      );
      this._gasStationsComponent = new GasStationsComponentImpl(
        stationsModule,
        pricesModule,
      );
    }
    return this._gasStationsComponent;
  }
}
