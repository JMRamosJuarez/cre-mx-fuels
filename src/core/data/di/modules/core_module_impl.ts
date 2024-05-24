import AppDbClientImpl from '@core/data/data_access/app_db_client_impl';
import AppGeoLocatorImpl from '@core/data/data_access/app_geolocator_impl';
import AppStorageImpl from '@core/data/data_access/app_storage_impl';
import AppXMLParserImpl from '@core/data/data_access/app_xml_parser_impl';
import HttpClientImpl from '@core/data/data_access/http_client_impl';
import AppDbClient from '@core/domain/data_access/app_db_client';
import AppGeoLocator from '@core/domain/data_access/app_geolocator';
import AppStorage from '@core/domain/data_access/app_storage';
import AppXMLParser from '@core/domain/data_access/app_xml_parser';
import HttpClient from '@core/domain/data_access/http_client';
import CoreModule from '@core/domain/di/modules/core_module';
import GasPricesMapperImpl from '@fuels/data/mappers/gas_prices_mapper_impl';
import GasStationsMapperImpl from '@fuels/data/mappers/gas_stations_mapper_impl';
import GasPricesMapper from '@fuels/domain/mappers/gas_prices_mapper';
import GasStationsMapper from '@fuels/domain/mappers/gas_stations_mapper';
import axios from 'axios';
import { Config } from 'react-native-config';
import {
  DatabaseParams,
  ResultSet,
  SQLiteDatabase,
  enablePromise,
} from 'react-native-sqlite-storage';

enablePromise(true);

export default class CoreModuleImpl implements CoreModule {
  private _xmlParser?: AppXMLParser;
  private _appGeolocator?: AppGeoLocator;
  private _appStorage?: AppStorage;
  private _creHttpClient?: HttpClient;
  private _gasStationsMapper?: GasStationsMapper;
  private _gasPricesMapper?: GasPricesMapper;
  private _dbClient?: AppDbClient<SQLiteDatabase, DatabaseParams, ResultSet>;

  get xmlParser(): AppXMLParser {
    if (!this._xmlParser) {
      this._xmlParser = new AppXMLParserImpl();
    }
    return this._xmlParser;
  }

  get appGeolocator(): AppGeoLocator {
    if (!this._appGeolocator) {
      this._appGeolocator = new AppGeoLocatorImpl();
    }
    return this._appGeolocator;
  }

  get appStorage(): AppStorage {
    if (!this._appStorage) {
      this._appStorage = new AppStorageImpl();
    }
    return this._appStorage;
  }

  get creHttpClient(): HttpClient {
    if (!this._creHttpClient) {
      const axiosInstance = axios.create({
        baseURL: Config.CRE_DATA_BASE_URL,
        timeout: 60000 * 10,
      });
      this._creHttpClient = new HttpClientImpl(axiosInstance);
    }
    return this._creHttpClient;
  }

  get gasStationsMapper(): GasStationsMapper {
    if (!this._gasStationsMapper) {
      this._gasStationsMapper = new GasStationsMapperImpl();
    }
    return this._gasStationsMapper;
  }

  get gasPricesMapper(): GasPricesMapper {
    if (!this._gasPricesMapper) {
      this._gasPricesMapper = new GasPricesMapperImpl();
    }
    return this._gasPricesMapper;
  }

  get dbClient(): AppDbClient<SQLiteDatabase, DatabaseParams, ResultSet> {
    if (!this._dbClient) {
      this._dbClient = new AppDbClientImpl(
        { name: 'cre-mx-fuels.db', location: 'default' },
        async db => {
          await db.executeSql('PRAGMA foreign_keys = ON;');

          await db.executeSql(`
          CREATE TABLE IF NOT EXISTS gas_stations (
            id TEXT PRIMARY KEY,
            cre_id TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
          );`);

          await db.executeSql(`
          CREATE TABLE IF NOT EXISTS prices (
            station_id TEXT,
            type TEXT,
            price REAL,
            PRIMARY KEY (station_id, type)
          );`);

          return db;
        },
      );
    }
    return this._dbClient;
  }
}
