import GasStationDbModel from '@fuels/data/models/gas_station_db_model';
import GasStationXmlModel from '@fuels/data/models/gas_station_xml_model';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationsMapper from '@fuels/domain/mappers/gas_stations_mapper';

export default class GasStationsMapperImpl implements GasStationsMapper {
  mapMapDbModel(model: GasStationDbModel): GasStation {
    return {
      id: model.id || '-',
      creId: model.cre_id || '-',
      name: model.name || '-',
      location: {
        lat: model.lat || 0,
        lng: model.lng || 0,
      },
      prices: [],
    };
  }

  mapMapXmlModel(model: GasStationXmlModel): GasStation {
    return {
      id: model['@_place_id'] || '-',
      creId: model.cre_id || '-',
      name: model.name || '-',
      location: {
        lat: model.location?.y || 0,
        lng: model.location?.x || 0,
      },
      prices: [],
    };
  }
}
