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
      latitude: model.lat || 0,
      longitude: model.lng || 0,
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
      latitude: model.location?.y || 0,
      longitude: model.location?.x || 0,
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

  private calculateDistance(locationA: Location, locationB: Location): number {
    const phi1 = (locationA.latitude * Math.PI) / 180; // convert degrees to radians
    const phi2 = (locationB.latitude * Math.PI) / 180;
    const deltaPhi =
      ((locationB.latitude - locationA.latitude) * Math.PI) / 180;
    const deltaLambda =
      ((locationB.longitude - locationA.longitude) * Math.PI) / 180;

    const a =
      this.hav(deltaPhi) +
      Math.cos(phi1) * Math.cos(phi2) * this.hav(deltaLambda);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_IN_METERS * c;
  }

  private hav(theta: number): number {
    const s = Math.sin(theta / 2);
    return s * s;
  }
}
