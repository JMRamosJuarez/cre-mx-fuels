import AppDbClient from '@core/domain/data_access/app_db_client';
import HttpClient from '@core/domain/data_access/http_client';
import GasPricesMapper from '@fuels/domain/mappers/gas_prices_mapper';
import GasStationsMapper from '@fuels/domain/mappers/gas_stations_mapper';
import SQLite from 'react-native-sqlite-storage';

export default interface CoreModule {
  readonly creHttpClient: HttpClient;

  readonly gasPricesMapper: GasPricesMapper;

  readonly gasStationsMapper: GasStationsMapper;

  readonly dbClient: AppDbClient<
    SQLite.SQLiteDatabase,
    SQLite.DatabaseParams,
    SQLite.ResultSet
  >;
}
