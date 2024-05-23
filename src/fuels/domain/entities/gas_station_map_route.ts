import Location from '@core/domain/entities/location';
import GasStation from '@fuels/domain/entities/gas_station';

type GasStationMapRoute = {
  readonly color: string;
  readonly origin: Location;
  readonly station: GasStation;
};

export default GasStationMapRoute;
