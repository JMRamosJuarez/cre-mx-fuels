import Location from '@core/domain/entities/location';

type GasStationRequest = {
  readonly id: string;
  readonly location: Location;
};

export default GasStationRequest;
