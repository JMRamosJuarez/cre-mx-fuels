import Location from '@core/domain/entities/location';
import GasStation from '@fuels/domain/entities/gas_station';

type GasStationsMarkersProps = {
  readonly onGasStationSelected: (request: {
    readonly index: number;
    readonly origin: Location;
    readonly station: GasStation;
  }) => void;
};

export default GasStationsMarkersProps;
