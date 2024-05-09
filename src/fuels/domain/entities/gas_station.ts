import Location from '@core/domain/entities/location';
import GasPrice from '@fuels/domain/entities/gas_price';

type GasStation = {
  readonly id: string;
  readonly creId: string;
  readonly name: string;
  readonly distance: number;
  readonly location: Location;
  readonly prices: GasPrice[];
};

export default GasStation;
