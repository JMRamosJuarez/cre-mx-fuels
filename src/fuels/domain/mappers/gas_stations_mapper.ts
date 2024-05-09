import Location from '@core/domain/entities/location';
import GasStationDbModel from '@fuels/data/models/gas_station_db_model';
import GasStationXmlModel from '@fuels/data/models/gas_station_xml_model';
import GasStation from '@fuels/domain/entities/gas_station';

export default interface GasStationsMapper {
  mapMapDbModel(
    requestLocation: Location,
    model: GasStationDbModel,
  ): GasStation;
  mapMapXmlModel(model: GasStationXmlModel): GasStation;
}
