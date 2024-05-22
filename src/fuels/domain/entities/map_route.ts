import Location from '@core/domain/entities/location';

type MapRoute = {
  readonly color: string;
  readonly data?: {
    readonly origin: Location;
    readonly destination: Location;
  };
};

export default MapRoute;
