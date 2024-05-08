import AppDbClientImpl from '@core/data/data_access/app_db_client_impl';
import HttpClientImpl from '@core/data/data_access/http_client_impl';
import AppDbClient from '@core/domain/data_access/app_db_client';
import HttpClient from '@core/domain/data_access/http_client';
import CoreModule from '@core/domain/di/modules/core_module';
import GasStationsMapperImpl from '@core/domain/mappers/gas_stations_mapper_impl';
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
  private _creHttpClient?: HttpClient;
  private _gasStationsMapper?: GasStationsMapper;
  private _dbClient?: AppDbClient<SQLiteDatabase, DatabaseParams, ResultSet>;

  get creHttClient(): HttpClient {
    if (!this._creHttpClient) {
      const axiosInstance = axios.create({
        baseURL: Config.CRE_BASE_URL,
        timeout: 60000 * 5,
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

          await db.executeSql('SELECT COUNT(*) FROM gas_stations');

          await db.executeSql(`
          CREATE TABLE IF NOT EXISTS prices (
            id INTEGER PRIMARY KEY,
            station_id TEXT,
            regular REAL,
            premium REAL,
            diesel REAL,
            FOREIGN KEY (station_id) REFERENCES gas_stations(id) ON DELETE CASCADE
          );`);

          const pricesResult = await db.executeSql(
            'SELECT COUNT(*) FROM prices',
          );

          if (pricesResult.length > 0) {
            const { rows } = pricesResult[0];
            const item = rows.item(0);
            const count = item['COUNT(*)'];
            if (count === 0) {
              console.log('PRE-POPULATE GAS PRICES');
            }
          }

          return db;
        },
      );
    }
    return this._dbClient;
  }
}
