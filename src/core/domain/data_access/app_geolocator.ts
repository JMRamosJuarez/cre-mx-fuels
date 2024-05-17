import Location from '@core/domain/entities/location';

export default interface AppGeoLocator {
  getLocation(): Promise<Location>;
}
