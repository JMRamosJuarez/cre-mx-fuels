import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import ExecutionProcess from '@fuels/domain/entities/execution_process';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationRequest from '@fuels/domain/entities/gas_station_request';
import GasStationsRequest from '@fuels/domain/entities/gas_stations_request';
import { Observable } from 'rxjs';

export default interface GasStationsRepository {
  validateDatasource(): Promise<DatasourceStatus>;

  getGasStation(request: GasStationRequest): Promise<GasStation>;

  getGasStations(request: GasStationsRequest): Promise<GasStation[]>;

  downloadGasStations(): Promise<Observable<ExecutionProcess>>;
}
