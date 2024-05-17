import BaseUseCase from '@core/domain/use_cases/base_use_case';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import GasPricesRepository from '@fuels/domain/repositories/gas_prices_repository';
import GasStationsRepository from '@fuels/domain/repositories/gas_stations_repository';

export default class ValidateDatasourceUseCase
  implements BaseUseCase<void, DatasourceStatus>
{
  constructor(
    private readonly stationsRepository: GasStationsRepository,
    private readonly pricesRepository: GasPricesRepository,
  ) {}

  async execute(_: void): Promise<DatasourceStatus> {
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
