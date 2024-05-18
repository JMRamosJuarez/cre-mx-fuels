import Location from '@core/domain/entities/location';
import GasStation from '@fuels/domain/entities/gas_station';

type GasStationsMapRegion = {
  readonly distance: number;
  readonly location: Location;
  readonly stations: GasStation[];
};

export default GasStationsMapRegion;
