import DownloadProcess from '@fuels/domain/entities/download_process';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationRequest from '@fuels/domain/entities/gas_station_request';
import GasStationsRequest from '@fuels/domain/entities/gas_stations_request';
import { Observable } from 'rxjs';

export default interface GasStationsRepository {
  validateDatasource(): Promise<'available' | 'not-available'>;

  getGasStation(request: GasStationRequest): Promise<GasStation>;

  getGasStations(request: GasStationsRequest): Promise<GasStation[]>;

  downloadGasStations(): Promise<Observable<DownloadProcess>>;
}
