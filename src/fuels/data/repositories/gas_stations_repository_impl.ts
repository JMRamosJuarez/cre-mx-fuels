import GasStationsDatasource from '@fuels/domain/datasources/gas_stations_datasource';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationsRequest from '@fuels/domain/entities/gas_stations_request';
import GasStationsRepository from '@fuels/domain/repositories/gas_stations_repository';

export default class GasStationsRepositoryImpl
  implements GasStationsRepository
{
  constructor(private readonly dbDatasource: GasStationsDatasource) {}

  getGasStation(request: string): Promise<GasStation> {
    return this.dbDatasource.getGasStation(request);
  }

  getGasStations(request?: GasStationsRequest): Promise<GasStation[]> {
    return this.dbDatasource.getGasStations(request);
  }
}
