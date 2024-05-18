import GasStation from '@fuels/domain/entities/gas_station';

type GasStationData = {
  readonly distance: number;
  readonly duration: number;
  readonly station: GasStation;
};

export default GasStationData;
