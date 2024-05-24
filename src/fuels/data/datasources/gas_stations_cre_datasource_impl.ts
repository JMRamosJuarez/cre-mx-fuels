import AppStorage from '@core/domain/data_access/app_storage';
import AppXMLParser from '@core/domain/data_access/app_xml_parser';
import HttpClient from '@core/domain/data_access/http_client';
import GasStationsFileModel from '@fuels/data/models/gas_stations_file_model';
import GasStationsDatasource from '@fuels/domain/datasources/gas_stations_datasource';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationRequest from '@fuels/domain/entities/gas_station_request';
import GasStationsRequest from '@fuels/domain/entities/gas_stations_request';
import GasStationsMapper from '@fuels/domain/mappers/gas_stations_mapper';

export default class GasStationsCreDatasourceImpl
  implements GasStationsDatasource
{
  constructor(
    private readonly xmlParser: AppXMLParser,
    private readonly mapper: GasStationsMapper,
    private readonly creHttpClient: HttpClient,
    private readonly appStorage: AppStorage,
  ) {}

  validateDatasource(): Promise<DatasourceStatus> {
    throw new Error(
      'Method "validateDatasource" is not implemented in GasStationsCreDatasourceImpl.',
    );
  }

  createGasStation(_: GasStation): Promise<GasStation> {
    throw new Error(
      'Method "createGasStation" is not implemented in GasStationsCreDatasourceImpl.',
    );
  }

  getGasStation(_: GasStationRequest): Promise<GasStation> {
    throw new Error(
      'Method "getGasStation" is not implemented in GasStationsCreDatasourceImpl.',
    );
  }

  async getGasStations(_: GasStationsRequest): Promise<GasStation[]> {
    const xml = await this.creHttpClient.get<string>('/publicaciones/places');
    const file: GasStationsFileModel = this.xmlParser.parse(xml);

    const models = file.places?.place || [];

    const stations = models.map(m => this.mapper.mapMapXmlModel(m));

    await this.appStorage.saveObject<{
      readonly size: number;
    }>('stations_size', { size: stations.length });

    return stations;
  }

  deleteGasStations(): Promise<number> {
    throw new Error(
      'Method "deleteGasStations" is not implemented in GasStationsCreDatasourceImpl.',
    );
  }
}
