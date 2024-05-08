import Location from '@core/domain/entities/location';

type GasStation = {
  readonly id: string;
  readonly creId: string;
  readonly name: string;
  readonly location: Location;
};

export default GasStation;
