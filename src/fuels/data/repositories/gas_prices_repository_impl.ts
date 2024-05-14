import GasPricesDatasource from '@fuels/domain/datasources/gas_prices_datasource';
import ExecutionProcess from '@fuels/domain/entities/execution_process';
import GasPrices from '@fuels/domain/entities/gas_prices';
import GasPricesRepository from '@fuels/domain/repositories/gas_prices_repository';
import { Observable, concatMap, from, map, scan } from 'rxjs';

export default class GasPricesRepositoryImpl implements GasPricesRepository {
  constructor(
    private readonly dbDatasource: GasPricesDatasource,
    private readonly creDatasource: GasPricesDatasource,
  ) {}

  validateDatasource(): Promise<'available' | 'not-available'> {
    return this.dbDatasource.validateDatasource();
  }

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

  async downloadPrices(): Promise<Observable<ExecutionProcess>> {
    const prices = await this.creDatasource.getGasPrices();
    return from(prices).pipe(
      concatMap(price => from(this.dbDatasource.saveGasPrices(price))),
      map((_, index) => index),
      scan(
        (_, curr) => {
          const progress = Math.round(((curr + 1) / prices.length) * 100);
          return { type: 'prices', progress };
        },
        { type: 'prices', progress: 0 },
      ),
    );
  }
}
