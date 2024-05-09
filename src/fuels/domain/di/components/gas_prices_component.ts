import GetGasPricesUseCase from '@fuels/domain/use_cases/get_gas_prices_use_case';

export default interface GasPricesComponent {
  readonly getGasPricesUseCase: GetGasPricesUseCase;
}
