import AppDbClient from '@core/domain/data_access/app_db_client';
import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import GasStationDbModel from '@fuels/data/models/gas_station_db_model';
import GasStationsDatasource from '@fuels/domain/datasources/gas_stations_datasource';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationRequest from '@fuels/domain/entities/gas_station_request';
import GasStationsRequest from '@fuels/domain/entities/gas_stations_request';
import GasStationsMapper from '@fuels/domain/mappers/gas_stations_mapper';
import SQLite from 'react-native-sqlite-storage';

export default class GasStationsDbDatasourceImpl
  implements GasStationsDatasource
{
  constructor(
    private readonly mapper: GasStationsMapper,
    private readonly dbClient: AppDbClient<
      SQLite.SQLiteDatabase,
      SQLite.DatabaseParams,
      SQLite.ResultSet
    >,
  ) {}

  async validateDatasource(): Promise<DatasourceStatus> {
    const { rows } = await this.dbClient.executeSql({
      query: 'SELECT COUNT(*) FROM gas_stations',
      params: [],
    });
    const item = rows.item(0);
    const count = item['COUNT(*)'];
    return count > 0 ? 'available' : 'not-available';
  }

  async createGasStation(request: GasStation): Promise<GasStation> {
    await this.dbClient.executeSql({
      query:
        'INSERT OR REPLACE INTO gas_stations (id, cre_id, name, lat, lng) VALUES (?, ?, ?, ?, ?)',
      params: [
        request.id,
        request.creId,
        request.name,
        request.location.latitude,
        request.location.longitude,
      ],
    });
    return request;
  }

  async getGasStation(request: GasStationRequest): Promise<GasStation> {
    const { rows } = await this.dbClient.executeSql({
      query: 'SELECT * FROM gas_stations WHERE id = ?',
      params: [request.id],
    });
    if (rows.length <= 0) {
      throw new AppError(AppErrorType.GAS_STATION_NOT_FOUND);
    }
    const model: GasStationDbModel = rows.item(0);
    return this.mapper.mapMapDbModel(request.location, model);
  }

  async getGasStations(request: GasStationsRequest): Promise<GasStation[]> {
    const { rows } = await this.dbClient.executeSql({
      query: 'SELECT * FROM gas_stations',
      params: [],
    });

    const entities = Array.from({ length: rows.length }).map((_, index) => {
      const model: GasStationDbModel = rows.item(index);
      return this.mapper.mapMapDbModel(request.location, model);
    });

    return entities
      .filter(({ distance }) => {
        return distance <= request.distance;
      })
      .sort((a, b) => a.distance - b.distance);
  }

  async deleteGasStations(): Promise<number> {
    const { rowsAffected } = await this.dbClient.executeSql({
      query: 'DELETE * FROM gas_stations',
      params: [],
    });
    return rowsAffected;
  }
}
