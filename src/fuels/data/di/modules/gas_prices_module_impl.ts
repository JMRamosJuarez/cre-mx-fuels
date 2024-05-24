import CoreModule from '@core/domain/di/modules/core_module';
import GasPricesCreDatasourceImpl from '@fuels/data/datasources/gas_prices_cre_datasource_impl';
import GasPricesDbDatasourceImpl from '@fuels/data/datasources/gas_prices_db_datasource_impl';
import GasPricesRepositoryImpl from '@fuels/data/repositories/gas_prices_repository_impl';
import GasPricesDatasource from '@fuels/domain/datasources/gas_prices_datasource';
import GasPricesModule from '@fuels/domain/di/modules/gas_prices_module';
import GasPricesRepository from '@fuels/domain/repositories/gas_prices_repository';

export default class GasPricesModuleImpl implements GasPricesModule {
  private _dbDatasource?: GasPricesDatasource;
  private _creDatasource?: GasPricesDatasource;
  private _repository?: GasPricesRepository;

  constructor(private readonly coreModule: CoreModule) {}

  get dbDatasource(): GasPricesDatasource {
    if (!this._dbDatasource) {
      this._dbDatasource = new GasPricesDbDatasourceImpl(
        this.coreModule.gasPricesMapper,
        this.coreModule.appStorage,
        this.coreModule.dbClient,
      );
    }
    return this._dbDatasource;
  }

  get creDatasource(): GasPricesDatasource {
    if (!this._creDatasource) {
      this._creDatasource = new GasPricesCreDatasourceImpl(
        this.coreModule.xmlParser,
        this.coreModule.gasPricesMapper,
        this.coreModule.creHttpClient,
        this.coreModule.appStorage,
      );
    }
    return this._creDatasource;
  }

  get repository(): GasPricesRepository {
    if (!this._repository) {
      this._repository = new GasPricesRepositoryImpl(
        this.dbDatasource,
        this.creDatasource,
      );
    }
    return this._repository;
  }
}
