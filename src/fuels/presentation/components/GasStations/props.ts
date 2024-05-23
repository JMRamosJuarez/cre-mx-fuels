import Location from '@core/domain/entities/location';
import GasStation from '@fuels/domain/entities/gas_station';

type GasStationsProps = {
  readonly onGasStationSelected: (request: {
    readonly index: number;
    readonly origin: Location;
    readonly station: GasStation;
  }) => void;
  readonly displayRoute: (request: {
    readonly index: number;
    readonly origin: Location;
    readonly station: GasStation;
  }) => void;
};

export default GasStationsProps;
