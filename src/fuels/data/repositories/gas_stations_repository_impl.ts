import GasStationsDatasource from '@fuels/domain/datasources/gas_stations_datasource';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationRequest from '@fuels/domain/entities/gas_station_request';
import GasStationsRequest from '@fuels/domain/entities/gas_stations_request';
import GasStationsRepository from '@fuels/domain/repositories/gas_stations_repository';

export default class GasStationsRepositoryImpl
  implements GasStationsRepository
{
  constructor(
    private readonly dbDatasource: GasStationsDatasource,
    private readonly creDatasource: GasStationsDatasource,
  ) {}

  async getGasStation(request: GasStationRequest): Promise<GasStation> {
    const status = await this.dbDatasource.validateDatasource();

    if (status === 'available') {
      return this.dbDatasource.getGasStation(request);
    }

    /**
     * This method receives a dummy request, the implementation
     * do not need params.
     */
    const gasStations = await this.creDatasource.getGasStations({
      distance: 0,
      location: request.location,
    });

    const promises = gasStations.map(gs =>
      this.dbDatasource.createGasStation(gs),
    );

    await Promise.all(promises);

    return this.dbDatasource.getGasStation(request);
  }

  async getGasStations(request: GasStationsRequest): Promise<GasStation[]> {
    const status = await this.dbDatasource.validateDatasource();

    if (status === 'available') {
      return this.dbDatasource.getGasStations(request);
    }

    /**
     * This method receives a dummy request, the implementation
     * do not need params.
     */
    const gasStations = await this.creDatasource.getGasStations(request);

    const promises = gasStations.map(gs =>
      this.dbDatasource.createGasStation(gs),
    );

    await Promise.all(promises);

    return this.dbDatasource.getGasStations(request);
  }
}
