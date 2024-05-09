import GasPricesDatasource from '@fuels/domain/datasources/gas_prices_datasource';
import GasPricesRepository from '@fuels/domain/repositories/gas_prices_repository';

export default interface GasPricesModule {
  readonly creDatasource: GasPricesDatasource;
  readonly dbDatasource: GasPricesDatasource;
  readonly repository: GasPricesRepository;
}
