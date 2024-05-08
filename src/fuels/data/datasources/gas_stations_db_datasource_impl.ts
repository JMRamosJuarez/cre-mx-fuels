import AppDbClient from '@core/domain/data_access/app_db_client';
import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import Location from '@core/domain/entities/location';
import GasStationDbModel from '@fuels/data/models/gas_station_db_model';
import GasStationsDatasource from '@fuels/domain/datasources/gas_stations_datasource';
import GasStation from '@fuels/domain/entities/gas_station';
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

  async validateDatasource(): Promise<'available' | 'not-available'> {
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
        request.location.lat,
        request.location.lng,
      ],
    });
    return request;
  }

  async getGasStation(request: string): Promise<GasStation> {
    const { rows } = await this.dbClient.executeSql({
      query: 'SELECT * FROM gas_stations WHERE id = ?',
      params: [request],
    });
    if (rows.length <= 0) {
      throw new AppError(AppErrorType.GAS_STATION_NOT_FOUND);
    }
    const model: GasStationDbModel = rows.item(0);
    return this.mapper.mapMapDbModel(model);
  }

  async getGasStations(request?: GasStationsRequest): Promise<GasStation[]> {
    if (request) {
      const { rows } = await this.dbClient.executeSql({
        query: 'SELECT * FROM gas_stations',
        params: [],
      });

      const entities = Array.from({ length: rows.length }).map((_, index) => {
        const model: GasStationDbModel = rows.item(index);
        return this.mapper.mapMapDbModel(model);
      });

      return entities
        .map(item => {
          const distance = this.calculateDistance(
            request.location,
            item.location,
          );
          return { distance, item };
        })
        .filter(({ distance }) => {
          return distance <= request.distance;
        })
        .sort((a, b) => a.distance - b.distance)
        .map(({ item }) => item);
    }

    const { rows } = await this.dbClient.executeSql({
      query: 'SELECT * FROM gas_stations',
      params: [],
    });

    return Array.from({ length: rows.length }).map((_, index) => {
      const model: GasStationDbModel = rows.item(index);
      return this.mapper.mapMapDbModel(model);
    });
  }

  async deleteGasStations(): Promise<number> {
    const { rowsAffected } = await this.dbClient.executeSql({
      query: 'DELETE * FROM gas_stations',
      params: [],
    });
    return rowsAffected;
  }

  private calculateDistance(a: Location, b: Location): number {
    // Convert latitude and longitude from degrees to radians
    const aLatRad: number = this.toRadians(a.lat);
    const aLonRad: number = this.toRadians(a.lng);

    const bLatRad: number = this.toRadians(b.lat);
    const bLonRad: number = this.toRadians(b.lng);

    // Difference in latitude and longitude
    const deltaLat: number = bLatRad - aLatRad;
    const deltaLon: number = bLonRad - aLonRad;

    // Haversine formula
    const haversine: number =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(aLatRad) * Math.cos(bLatRad) * Math.sin(deltaLon / 2) ** 2;

    const c: number =
      2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

    const radius: number = 6371; // Radius of the Earth in kilometers
    const distanceKm: number = radius * c;

    // Convert distance to meters
    const distanceM: number = distanceKm * 1000;

    return distanceM;
  }

  private toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}
