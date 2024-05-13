import BaseUseCase from '@core/domain/use_cases/base_use_case';
import DownloadProcess from '@fuels/domain/entities/download_process';
import GasPricesRepository from '@fuels/domain/repositories/gas_prices_repository';
import GasStationsRepository from '@fuels/domain/repositories/gas_stations_repository';
import { Observable, merge } from 'rxjs';

export default class DownloadDataUseCase
  implements BaseUseCase<void, Observable<DownloadProcess>>
{
  constructor(
    private readonly stationsRepository: GasStationsRepository,
    private readonly pricesRepository: GasPricesRepository,
  ) {}

  async execute(_: void): Promise<Observable<DownloadProcess>> {
    const stations = await this.stationsRepository.downloadGasStations();
    const prices = await this.pricesRepository.downloadPrices();
    return merge(stations, prices);
  }
}
