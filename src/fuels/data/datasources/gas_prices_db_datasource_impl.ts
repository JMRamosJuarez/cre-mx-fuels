import AppDbClient from '@core/domain/data_access/app_db_client';
import AppStorage from '@core/domain/data_access/app_storage';
import GasPriceDbModel from '@fuels/data/models/gas_price_db_model';
import GasPricesDatasource from '@fuels/domain/datasources/gas_prices_datasource';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import GasPrices from '@fuels/domain/entities/gas_prices';
import GasPricesMapper from '@fuels/domain/mappers/gas_prices_mapper';
import dayjs from 'dayjs';
import SQLite from 'react-native-sqlite-storage';

export default class GasPricesDbDatasourceImpl implements GasPricesDatasource {
  constructor(
    private readonly mapper: GasPricesMapper,
    private readonly appStorage: AppStorage,
    private readonly dbClient: AppDbClient<
      SQLite.SQLiteDatabase,
      SQLite.DatabaseParams,
      SQLite.ResultSet
    >,
  ) {}

  async validateDatasource(): Promise<DatasourceStatus> {
    const { rows } = await this.dbClient.executeSql({
      query: 'SELECT COUNT(*) FROM prices',
      params: [],
    });

    const item = rows.item(0);
    const count = item['COUNT(*)'];

    const datasource = await this.appStorage.tryGetObject<{
      readonly created_at: number;
      readonly size: number;
    }>('prices_datasource');

    const createdAt = dayjs(datasource?.created_at || new Date().getTime());
    const current = dayjs();

    const diff = current.diff(createdAt, 'days');

    const size = datasource?.size || -1;

    return diff < 7 && count === size ? 'available' : 'not-available';
  }

  async saveGasPrices(request: GasPrices): Promise<GasPrices> {
    const promises = request.prices.map(p => {
      return this.dbClient.executeSql({
        query:
          'INSERT OR REPLACE INTO prices (station_id, type, price) VALUES (?, ?, ?)',
        params: [request.gasStationId, p.type, p.price],
      });
    });
    await Promise.all(promises);
    return request;
  }

  getGasPrices(): Promise<GasPrices[]> {
    throw new Error(
      'Method "getGasPrices" is not implemented in GasPricesDbDatasourceImpl.',
    );
  }

  async getGasPricesByStationId(request: string): Promise<GasPrices> {
    const { rows } = await this.dbClient.executeSql({
      query: 'SELECT * FROM prices WHERE station_id = ? ORDER BY price ASC',
      params: [request],
    });
    const prices = Array.from({ length: rows.length }).map((_, index) => {
      const model: GasPriceDbModel = rows.item(index);
      return this.mapper.mapMapDbModel(model);
    });
    return { gasStationId: request, prices };
  }

  async deleteGasPrices(): Promise<number> {
    const { rowsAffected } = await this.dbClient.executeSql({
      query: 'DELETE * FROM prices',
      params: [],
    });
    return rowsAffected;
  }
}
