import CoreComponent from '@core/domain/di/components/core_component';
import CoreModule from '@core/domain/di/modules/core_module';
import GasStationsComponentImpl from '@fuels/data/di/components/gas_stations_component';
import GasStationsModuleImpl from '@fuels/data/di/modules/gas_stations_module_impl';
import GasStationsComponent from '@fuels/domain/di/components/gas_stations_component';
import GasStationsModule from '@fuels/domain/di/modules/gas_stations_module';

export default class CoreComponentImpl implements CoreComponent {
  private _gasStationsComponent?: GasStationsComponent;

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
}
