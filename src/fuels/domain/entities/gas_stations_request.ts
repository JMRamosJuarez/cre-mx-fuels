import Location from '@core/domain/entities/location';

type GasStationsRequest = {
  readonly distance: number;
  readonly location: Location;
};

export default GasStationsRequest;
