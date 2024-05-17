import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import GasStationsDatasource from '@fuels/domain/datasources/gas_stations_datasource';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import ExecutionProcess from '@fuels/domain/entities/execution_process';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationRequest from '@fuels/domain/entities/gas_station_request';
import GasStationsRequest from '@fuels/domain/entities/gas_stations_request';
import GasStationsRepository from '@fuels/domain/repositories/gas_stations_repository';
import { Observable, concatMap, from, map, scan } from 'rxjs';

export default class GasStationsRepositoryImpl
  implements GasStationsRepository
{
  constructor(
    private readonly dbDatasource: GasStationsDatasource,
    private readonly creDatasource: GasStationsDatasource,
  ) {}

  validateDatasource(): Promise<DatasourceStatus> {
    return this.dbDatasource.validateDatasource();
  }

  async getGasStation(request: GasStationRequest): Promise<GasStation> {
    const status = await this.dbDatasource.validateDatasource();

    if (status === 'available') {
      return this.dbDatasource.getGasStation(request);
    }

    throw new AppError(AppErrorType.DATASOURCE_NOT_AVAILABLE);
  }

  async getGasStations(request: GasStationsRequest): Promise<GasStation[]> {
    const status = await this.dbDatasource.validateDatasource();

    if (status === 'available') {
      return this.dbDatasource.getGasStations(request);
    }

    throw new AppError(AppErrorType.DATASOURCE_NOT_AVAILABLE);
  }

  async downloadGasStations(): Promise<Observable<ExecutionProcess>> {
    /**
     * This method receives a dummy request, the implementation
     * do not need params.
     */
    const gasStations = await this.creDatasource.getGasStations({
      distance: 0,
    });

    return from(gasStations).pipe(
      concatMap(gs => from(this.dbDatasource.createGasStation(gs))),
      map((_, index) => index),
      scan(
        (_, curr) => {
          const progress = Math.round(((curr + 1) / gasStations.length) * 100);
          return { type: 'stations', progress };
        },
        { type: 'stations', progress: 0 },
      ),
    );
  }
}
