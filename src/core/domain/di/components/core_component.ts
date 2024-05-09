import GasPricesComponent from '@fuels/domain/di/components/gas_prices_component';
import GasStationsComponent from '@fuels/domain/di/components/gas_stations_component';

export default interface CoreComponent {
  readonly gasStationsComponent: GasStationsComponent;
  readonly gasPricesComponent: GasPricesComponent;
}
