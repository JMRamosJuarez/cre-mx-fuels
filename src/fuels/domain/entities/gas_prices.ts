import GasPrice from '@fuels/domain/entities/gas_price';

type GasPrices = {
  readonly gasStationId: string;
  readonly prices: GasPrice[];
};

export default GasPrices;
