import BaseUseCase from '@core/domain/use_cases/base_use_case';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationsRequest from '@fuels/domain/entities/gas_stations_request';
import GasStationsRepository from '@fuels/domain/repositories/gas_stations_repository';

export default class GetGasStationsUseCase
  implements BaseUseCase<GasStationsRequest, GasStation[]>
{
  constructor(private readonly repository: GasStationsRepository) {}

  execute(request: GasStationsRequest): Promise<GasStation[]> {
    return this.repository.getGasStations(request);
  }
}
