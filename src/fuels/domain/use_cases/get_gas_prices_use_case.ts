import BaseUseCase from '@core/domain/use_cases/base_use_case';
import GasPrices from '@fuels/domain/entities/gas_prices';
import GasPricesRepository from '@fuels/domain/repositories/gas_prices_repository';

export default class GetGasPricesUseCase
  implements BaseUseCase<string, GasPrices>
{
  constructor(private readonly repository: GasPricesRepository) {}

  execute(request: string): Promise<GasPrices> {
    return this.repository.getGasPrices(request);
  }
}
