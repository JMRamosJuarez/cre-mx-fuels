import Location from '@core/domain/entities/location';

type GasStationsRequest = {
  readonly distance: number;
  readonly origin: Location;
};

export default GasStationsRequest;
