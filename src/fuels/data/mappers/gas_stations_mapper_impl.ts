import { EARTH_RADIUS_IN_METERS } from '@core/domain/entities/earth';
import Location from '@core/domain/entities/location';
import GasStationDbModel from '@fuels/data/models/gas_station_db_model';
import GasStationXmlModel from '@fuels/data/models/gas_station_xml_model';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationsMapper from '@fuels/domain/mappers/gas_stations_mapper';

export default class GasStationsMapperImpl implements GasStationsMapper {
  mapMapDbModel(
    requestLocation: Location,
    model: GasStationDbModel,
  ): GasStation {
    const location: Location = {
      lat: model.lat || 0,
      lng: model.lng || 0,
    };
    const distance = this.calculateDistance(requestLocation, location);
    return {
      id: model.id || '-',
      creId: model.cre_id || '-',
      name: model.name || '-',
      distance,
      location,
      prices: [],
    };
  }

  mapMapXmlModel(model: GasStationXmlModel): GasStation {
    const location: Location = {
      lat: model.location?.y || 0,
      lng: model.location?.x || 0,
    };
    return {
      id: model['@_place_id'] || '-',
      creId: model.cre_id || '-',
      name: model.name || '-',
      distance: -1,
      location,
      prices: [],
    };
  }

  private calculateDistance(a: Location, b: Location): number {
    // Convert latitude and longitude from degrees to radians
    const aLatRad: number = this.toRadians(a.lat);
    const aLonRad: number = this.toRadians(a.lng);

    const bLatRad: number = this.toRadians(b.lat);
    const bLonRad: number = this.toRadians(b.lng);

    // Difference in latitude and longitude
    const deltaLat: number = bLatRad - aLatRad;
    const deltaLon: number = bLonRad - aLonRad;

    // Haversine formula
    const haversine: number =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(aLatRad) * Math.cos(bLatRad) * Math.sin(deltaLon / 2) ** 2;

    const c: number =
      2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

    const radius: number = EARTH_RADIUS_IN_METERS / 1000; // Radius of the Earth in kilometers
    const distanceKm: number = radius * c;

    // Convert distance to meters
    const distanceM: number = distanceKm * 1000;

    return distanceM;
  }

  private toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}
