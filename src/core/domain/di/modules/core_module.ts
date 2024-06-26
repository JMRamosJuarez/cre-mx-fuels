import AppDbClient from '@core/domain/data_access/app_db_client';
import AppGeoLocator from '@core/domain/data_access/app_geolocator';
import AppStorage from '@core/domain/data_access/app_storage';
import AppXMLParser from '@core/domain/data_access/app_xml_parser';
import HttpClient from '@core/domain/data_access/http_client';
import GasPricesMapper from '@fuels/domain/mappers/gas_prices_mapper';
import GasStationsMapper from '@fuels/domain/mappers/gas_stations_mapper';
import SQLite from 'react-native-sqlite-storage';

export default interface CoreModule {
  readonly xmlParser: AppXMLParser;

  readonly appGeolocator: AppGeoLocator;

  readonly appStorage: AppStorage;

  readonly creHttpClient: HttpClient;

  readonly gasPricesMapper: GasPricesMapper;

  readonly gasStationsMapper: GasStationsMapper;

  readonly dbClient: AppDbClient<
    SQLite.SQLiteDatabase,
    SQLite.DatabaseParams,
    SQLite.ResultSet
  >;
}
