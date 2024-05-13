import BaseUseCase from '@core/domain/use_cases/base_use_case';
import GasPricesRepository from '@fuels/domain/repositories/gas_prices_repository';
import GasStationsRepository from '@fuels/domain/repositories/gas_stations_repository';

export default class ValidateDatasourceUseCase
  implements BaseUseCase<void, 'available' | 'not-available'>
{
  constructor(
    private readonly stationsRepository: GasStationsRepository,
    private readonly pricesRepository: GasPricesRepository,
  ) {}

  async execute(_: void): Promise<'available' | 'not-available'> {
    try {
      const stations = await this.stationsRepository.validateDatasource();
      const prices = await this.pricesRepository.validateDatasource();
      return stations === 'available' && prices === 'available'
        ? 'available'
        : 'not-available';
    } catch (__) {
      return 'not-available';
    }
  }
}
