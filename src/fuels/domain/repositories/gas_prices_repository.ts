import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import ExecutionProcess from '@fuels/domain/entities/execution_process';
import GasPrices from '@fuels/domain/entities/gas_prices';
import { Observable } from 'rxjs';

export default interface GasPricesRepository {
  validateDatasource(): Promise<DatasourceStatus>;

  getGasPrices(request: string): Promise<GasPrices>;

  downloadPrices(): Promise<Observable<ExecutionProcess>>;
}
