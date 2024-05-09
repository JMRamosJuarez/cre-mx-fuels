import GasPrices from '@fuels/domain/entities/gas_prices';

export default interface GasPricesRepository {
  getGasPrices(request: string): Promise<GasPrices>;
}
