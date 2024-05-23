import { AppSelector, useAppSelector } from '@core/presentation/redux';
import GasStation from '@fuels/domain/entities/gas_station';

const station: AppSelector<GasStation | undefined> = ({ gasStationsReducer }) =>
  gasStationsReducer.station;

export const useSelectedStation = () => useAppSelector(station);
