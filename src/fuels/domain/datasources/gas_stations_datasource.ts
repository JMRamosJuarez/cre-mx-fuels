import GasStation from '@fuels/domain/entities/gas_station';
import GasStationsRequest from '@fuels/domain/entities/gas_stations_request';

export default interface GasStationsDatasource {
  createGasStation(request: GasStation): Promise<GasStation>;

  getGasStation(request: string): Promise<GasStation>;

  getGasStations(request?: GasStationsRequest): Promise<GasStation[]>;

  deleteGasStations(): Promise<number>;
}