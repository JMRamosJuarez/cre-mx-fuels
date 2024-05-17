import Location from '@core/domain/entities/location';
import GasStation from '@fuels/domain/entities/gas_station';

type MapRegion = {
  readonly location: Location;
  readonly stations: GasStation[];
};

export default MapRegion;
