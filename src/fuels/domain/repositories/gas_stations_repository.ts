import GasStation from '@fuels/domain/entities/gas_station';
import GasStationRequest from '@fuels/domain/entities/gas_station_request';
import GasStationsRequest from '@fuels/domain/entities/gas_stations_request';

export default interface GasStationsRepository {
  getGasStation(request: GasStationRequest): Promise<GasStation>;

  getGasStations(request: GasStationsRequest): Promise<GasStation[]>;
}
