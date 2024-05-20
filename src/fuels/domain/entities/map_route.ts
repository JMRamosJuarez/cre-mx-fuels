import Location from '@core/domain/entities/location';
import GasStation from '@fuels/domain/entities/gas_station';

type MapRoute = {
  readonly color: string;
  readonly data?: {
    readonly origin: Location;
    readonly station: GasStation;
  };
};

export default MapRoute;
