import Location from '@core/domain/entities/location';

type EdgeCoordinates = {
  readonly north: Location;
  readonly south: Location;
  readonly east: Location;
  readonly west: Location;
};

export default EdgeCoordinates;
