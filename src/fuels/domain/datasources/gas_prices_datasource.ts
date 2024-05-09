import GasPrices from '@fuels/domain/entities/gas_prices';

export default interface GasPricesDatasource {
  validateDatasource(): Promise<'available' | 'not-available'>;

  saveGasPrices(request: GasPrices): Promise<GasPrices>;

  getGasPrices(): Promise<GasPrices[]>;

  getGasPricesByStationId(request: string): Promise<GasPrices>;

  deleteGasPrices(): Promise<number>;
}
