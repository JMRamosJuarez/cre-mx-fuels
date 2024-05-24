import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import GasPricesDatasource from '@fuels/domain/datasources/gas_prices_datasource';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import ExecutionProcess from '@fuels/domain/entities/execution_process';
import GasPrices from '@fuels/domain/entities/gas_prices';
import GasPricesRepository from '@fuels/domain/repositories/gas_prices_repository';
import { Observable, concatMap, from, scan } from 'rxjs';

export default class GasPricesRepositoryImpl implements GasPricesRepository {
  constructor(
    private readonly dbDatasource: GasPricesDatasource,
    private readonly creDatasource: GasPricesDatasource,
  ) {}

  validateDatasource(): Promise<DatasourceStatus> {
    return this.dbDatasource.validateDatasource();
  }

  async getGasPrices(request: string): Promise<GasPrices> {
    const status = await this.dbDatasource.validateDatasource();

    if (status === 'available') {
      return await this.dbDatasource.getGasPricesByStationId(request);
    }

    throw new AppError(AppErrorType.DATASOURCE_NOT_AVAILABLE);
  }

  async downloadPrices(): Promise<Observable<ExecutionProcess>> {
    const prices = await this.creDatasource.getGasPrices();

    return from(prices).pipe(
      concatMap(price => from(this.dbDatasource.saveGasPrices(price))),
      scan(
        (_, __, index) => {
          const progress = index / prices.length;
          return { type: 'prices', progress };
        },
        { type: 'prices', progress: 0 },
      ),
    );
  }
}
