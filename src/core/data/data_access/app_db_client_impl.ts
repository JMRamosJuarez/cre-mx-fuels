import AppDbClient from '@core/domain/data_access/app_db_client';
import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import SQLRequest from '@core/domain/entities/sql_request';
import SQLite from 'react-native-sqlite-storage';

export default class AppDbClientImpl
  implements
    AppDbClient<SQLite.SQLiteDatabase, SQLite.DatabaseParams, SQLite.ResultSet>
{
  private _db?: SQLite.SQLiteDatabase;
  private _openDatabase?: Promise<SQLite.SQLiteDatabase>;

  constructor(
    private params: SQLite.DatabaseParams,
    private init: (db: SQLite.SQLiteDatabase) => Promise<SQLite.SQLiteDatabase>,
  ) {}

  async openDatabase(): Promise<SQLite.SQLiteDatabase> {
    if (this._openDatabase) {
      return await this._openDatabase;
    }
    const requestRef = async () => {
      if (!this._db) {
        const instance = await SQLite.openDatabase(this.params);
        this._db = await this.init(instance);
      }
      return this._db;
    };
    this._openDatabase = requestRef().finally(() => {
      this._openDatabase = undefined;
    });
    return await this._openDatabase;
  }

  async executeSql(request: SQLRequest): Promise<SQLite.ResultSet> {
    const db = await this.openDatabase();
    const results = await db.executeSql(request.query, request.params);
    if (results && results.length > 0) {
      return results[0];
    }
    throw new AppError(AppErrorType.SQL_RESULT_NOT_FOUND);
  }
}
