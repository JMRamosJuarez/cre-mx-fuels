import GetGasStationsUseCase from '@fuels/domain/use_cases/get_gas_stations_use_case';

export default interface GasStationsComponent {
  readonly getGasStationsUseCase: GetGasStationsUseCase;
}
