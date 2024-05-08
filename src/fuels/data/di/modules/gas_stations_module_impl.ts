import CoreModule from '@core/domain/di/modules/core_module';
import GasStationsDbDatasourceImpl from '@fuels/data/datasources/gas_stations_db_datasource_impl';
import GasStationsRepositoryImpl from '@fuels/data/repositories/gas_stations_repository_impl';
import GasStationsDatasource from '@fuels/domain/datasources/gas_stations_datasource';
import GasStationsModule from '@fuels/domain/di/modules/gas_stations_module';
import GasStationsRepository from '@fuels/domain/repositories/gas_stations_repository';

export default class GasStationsModuleImpl implements GasStationsModule {
  private _dbDatasource?: GasStationsDatasource;
  private _repository?: GasStationsRepository;

  constructor(private readonly coreModule: CoreModule) {}

  get dbDatasource(): GasStationsDatasource {
    if (!this._dbDatasource) {
      this._dbDatasource = new GasStationsDbDatasourceImpl(
        this.coreModule.gasStationsMapper,
        this.coreModule.dbClient,
      );
    }
    return this._dbDatasource;
  }

  get repository(): GasStationsRepository {
    if (!this._repository) {
      this._repository = new GasStationsRepositoryImpl(this.dbDatasource);
    }
    return this._repository;
  }
}