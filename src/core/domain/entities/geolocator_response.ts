import Location from '@core/domain/entities/location';

interface NotAvailable {
  readonly status: 'unavailable' | 'blocked' | 'denied';
}

interface Available {
  readonly status: 'limited' | 'granted';
  readonly location: Location;
}

type GeoLocatorResponse = NotAvailable | Available;

export default GeoLocatorResponse;
