import GasPricesDatasource from '@fuels/domain/datasources/gas_prices_datasource';
import GasPrices from '@fuels/domain/entities/gas_prices';
import GasPricesRepository from '@fuels/domain/repositories/gas_prices_repository';

export default class GasPricesRepositoryImpl implements GasPricesRepository {
  constructor(
    private readonly dbDatasource: GasPricesDatasource,
    private readonly creDatasource: GasPricesDatasource,
  ) {}

  async getGasPrices(request: string): Promise<GasPrices> {
    const status = await this.dbDatasource.validateDatasource();
    if (status === 'available') {
      return await this.dbDatasource.getGasPricesByStationId(request);
    }
    const remote = await this.creDatasource.getGasPrices();
    const promises = remote.map(item => this.dbDatasource.saveGasPrices(item));
    await Promise.all(promises);
    return await this.dbDatasource.getGasPricesByStationId(request);
  }
}
