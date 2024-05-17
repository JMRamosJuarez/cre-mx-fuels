import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import GasPrices from '@fuels/domain/entities/gas_prices';

export default interface GasPricesDatasource {
  validateDatasource(): Promise<DatasourceStatus>;

  saveGasPrices(request: GasPrices): Promise<GasPrices>;

  getGasPrices(): Promise<GasPrices[]>;

  getGasPricesByStationId(request: string): Promise<GasPrices>;

  deleteGasPrices(): Promise<number>;
}
