import GasStation from '@fuels/domain/entities/gas_station';

type GasStationsProps = {
  readonly selectStation: (station: GasStation) => void;
  readonly displayRoute: (station: GasStation) => void;
};

export default GasStationsProps;
