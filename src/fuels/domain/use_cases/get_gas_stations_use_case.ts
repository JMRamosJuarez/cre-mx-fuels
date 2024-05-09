import BaseUseCase from '@core/domain/use_cases/base_use_case';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationsRequest from '@fuels/domain/entities/gas_stations_request';
import GasPricesRepository from '@fuels/domain/repositories/gas_prices_repository';
import GasStationsRepository from '@fuels/domain/repositories/gas_stations_repository';

export default class GetGasStationsUseCase
  implements BaseUseCase<GasStationsRequest, GasStation[]>
{
  constructor(
    private readonly stationsRepository: GasStationsRepository,
    private readonly pricesRepository: GasPricesRepository,
  ) {}

  async execute(request: GasStationsRequest): Promise<GasStation[]> {
    const result = await this.stationsRepository.getGasStations(request);

    const stations: GasStation[] = [];

    for (const station of result) {
      const { prices } = await this.pricesRepository.getGasPrices(station.id);
      stations.push({ ...station, prices });
    }

    return stations;
  }
}
