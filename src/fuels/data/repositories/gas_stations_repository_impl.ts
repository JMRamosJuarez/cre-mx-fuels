import GasStationsDatasource from '@fuels/domain/datasources/gas_stations_datasource';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationsRequest from '@fuels/domain/entities/gas_stations_request';
import GasStationsRepository from '@fuels/domain/repositories/gas_stations_repository';

export default class GasStationsRepositoryImpl
  implements GasStationsRepository
{
  constructor(
    private readonly dbDatasource: GasStationsDatasource,
    private readonly creDatasource: GasStationsDatasource,
  ) {}

  async getGasStation(request: string): Promise<GasStation> {
    const status = await this.dbDatasource.validateDatasource();

    if (status === 'available') {
      return this.dbDatasource.getGasStation(request);
    }

    const gasStations = await this.creDatasource.getGasStations();

    const promises = gasStations.map(gs =>
      this.dbDatasource.createGasStation(gs),
    );

    await Promise.all(promises);

    return this.dbDatasource.getGasStation(request);
  }

  async getGasStations(request?: GasStationsRequest): Promise<GasStation[]> {
    const status = await this.dbDatasource.validateDatasource();

    if (status === 'available') {
      return this.dbDatasource.getGasStations(request);
    }

    const gasStations = await this.creDatasource.getGasStations();

    const promises = gasStations.map(gs =>
      this.dbDatasource.createGasStation(gs),
    );

    await Promise.all(promises);

    return this.dbDatasource.getGasStations(request);
  }
}
