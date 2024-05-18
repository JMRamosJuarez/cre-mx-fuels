import Location from '@core/domain/entities/location';
import GasStation from '@fuels/domain/entities/gas_station';

type GasStationRoute = {
  readonly station: GasStation;
  readonly origin: Location;
  readonly destination: Location;
};

export default GasStationRoute;
